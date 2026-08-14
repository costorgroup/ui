import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@emotion/react';
import { getMenuPosition } from './get-coords';
import { MenuContentContext, MenuContext, MenuItemContext } from './context';
import { MenuBase } from './menu-base';
import { TMenuRootProps } from './types';

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
};

type TMenuPanelProps = TMenuRootProps & {
  panelRef?: React.Ref<HTMLDivElement>;
};

const MenuPanel = ({
  children,
  placement: placementProp,
  onMouseEnter,
  onMouseLeave,
  panelRef,
  ...props
}: TMenuPanelProps) => {
  const theme = useTheme();
  const menu = useContext(MenuContext);
  const item = useContext(MenuItemContext);

  if (!menu) {
    throw new Error('Menu must provide context');
  }

  const isSubmenu = Boolean(item);
  const preferredPlacement =
    placementProp ?? (isSubmenu ? 'right-start' : menu.placement);
  const shouldMount = isSubmenu ? Boolean(item?.submenuOpen) : menu.open;

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [resolvedPlacement, setResolvedPlacement] = useState(preferredPlacement);
  const contentRef = useRef<HTMLDivElement>(null);

  const setContentNode = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      assignRef(panelRef, node);
    },
    [panelRef],
  );

  useEffect(() => {
    if (shouldMount) {
      setMounted(true);
      return;
    }

    setVisible(false);
  }, [shouldMount]);

  const getViewportPadding = useCallback(() => {
    const value = theme.spacing(theme.gap.md);
    const amount = parseFloat(value);

    if (Number.isNaN(amount)) {
      return 16;
    }

    if (value.endsWith('rem')) {
      const root =
        typeof document !== 'undefined'
          ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
          : 16;

      return amount * root;
    }

    return amount;
  }, [theme]);

  const updatePosition = useCallback(() => {
    const anchor = isSubmenu ? item?.itemRef.current : menu.getAnchor();
    const content = contentRef.current;

    if (!anchor || !content) {
      return;
    }

    const next = getMenuPosition(
      anchor.getBoundingClientRect(),
      content.getBoundingClientRect(),
      preferredPlacement,
      menu.offset,
      getViewportPadding(),
      {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    );

    setCoords({ top: next.top, left: next.left });
    setResolvedPlacement(next.placement);
  }, [
    getViewportPadding,
    isSubmenu,
    item?.itemRef,
    menu,
    preferredPlacement,
  ]);

  useLayoutEffect(() => {
    if (!mounted) {
      return;
    }

    updatePosition();

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        if (shouldMount) {
          setVisible(true);
        }
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [mounted, shouldMount, updatePosition, children]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const handleReposition = () => updatePosition();

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [mounted, updatePosition]);

  useEffect(() => {
    if (!mounted || isSubmenu) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest(`[data-menu-id="${menu.menuId}"]`) ||
        menu.getAnchor()?.contains(target)
      ) {
        return;
      }

      menu.close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menu.close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmenu, menu, mounted]);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <MenuContentContext.Provider
      value={{ isSubmenu, submenuPlacement: resolvedPlacement }}
    >
      <MenuBase
        ref={setContentNode}
        data-menu-id={menu.menuId}
        top={coords.top}
        left={coords.left}
        visible={visible}
        onMouseEnter={(event) => {
          if (isSubmenu) {
            item?.openSubmenu();
          }

          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (isSubmenu) {
            item?.scheduleCloseSubmenu();
          }

          onMouseLeave?.(event);
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) {
            return;
          }

          if (event.propertyName !== 'opacity') {
            return;
          }

          if (!visible) {
            setMounted(false);
          }
        }}
        {...props}
      >
        {children}
      </MenuBase>
    </MenuContentContext.Provider>,
    document.body,
  );
};

const Menu = forwardRef<HTMLDivElement, TMenuRootProps>(
  (
    {
      children,
      placement,
      offset = 4,
      anchorEl = null,
      open = false,
      onClose,
      ...props
    },
    ref,
  ) => {
    const parentMenu = useContext(MenuContext);
    const item = useContext(MenuItemContext);
    const isSubmenu = Boolean(parentMenu && item);
    const menuId = useId();
    const rootPlacement = placement ?? 'bottom-start';

    const close = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const getAnchor = useCallback(() => anchorEl, [anchorEl]);

    const value = useMemo(
      () => ({
        menuId,
        open: Boolean(open),
        placement: rootPlacement,
        offset,
        getAnchor,
        close,
      }),
      [close, getAnchor, menuId, offset, open, rootPlacement],
    );

    if (isSubmenu) {
      return (
        <MenuPanel placement={placement} panelRef={ref} {...props}>
          {children}
        </MenuPanel>
      );
    }

    return (
      <MenuContext.Provider value={value}>
        <MenuPanel placement={rootPlacement} panelRef={ref} {...props}>
          {children}
        </MenuPanel>
      </MenuContext.Provider>
    );
  },
);

Menu.displayName = 'Menu';

export { Menu };
export default Menu;
