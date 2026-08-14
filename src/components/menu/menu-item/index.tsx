import React, {
  Children,
  forwardRef,
  isValidElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { menuItemClasses } from './classes';
import { ArrowRightIcon } from '../../../icons';
import { MenuItemContext } from '../context';
import { SMenuItem, SMenuItemLabel } from './styles';
import { TMenuItemProps } from './types';

const SUBMENU_CLOSE_DELAY_MS = 200;

const isNestedMenu = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'Menu';

const MenuItem = forwardRef<HTMLButtonElement, TMenuItemProps>(
  (
    {
      children,
      color = 'default',
      disabled = false,
      onClick,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const itemRef = useRef<HTMLButtonElement>(null);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        itemRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const label: ReactNode[] = [];
    const submenu: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isNestedMenu(child)) {
        submenu.push(child);
        return;
      }

      label.push(child);
    });

    const hasSubmenu = submenu.length > 0;

    const cancelCloseSubmenu = useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);

    const openSubmenu = useCallback(() => {
      cancelCloseSubmenu();
      setSubmenuOpen(true);
    }, [cancelCloseSubmenu]);

    const scheduleCloseSubmenu = useCallback(() => {
      cancelCloseSubmenu();
      closeTimerRef.current = setTimeout(() => {
        setSubmenuOpen(false);
      }, SUBMENU_CLOSE_DELAY_MS);
    }, [cancelCloseSubmenu]);

    const itemContext = useMemo(
      () => ({
        itemRef,
        submenuOpen,
        setSubmenuOpen,
        openSubmenu,
        scheduleCloseSubmenu,
        cancelCloseSubmenu,
      }),
      [cancelCloseSubmenu, openSubmenu, scheduleCloseSubmenu, submenuOpen],
    );

    return (
      <MenuItemContext.Provider value={itemContext}>
        <SMenuItem
          ref={setRefs}
          type="button"
          role="menuitem"
          color={color}
          hasSubmenu={hasSubmenu}
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event);

            if (event.defaultPrevented || disabled) {
              return;
            }

            if (hasSubmenu) {
              cancelCloseSubmenu();
              setSubmenuOpen((current) => !current);
            }
          }}
          onMouseEnter={() => {
            if (hasSubmenu && !disabled) {
              openSubmenu();
            }
          }}
          onMouseLeave={() => {
            if (hasSubmenu) {
              scheduleCloseSubmenu();
            }
          }}
          {...props}
        className={mergeClasses(
          menuItemClasses.root,
          disabled && menuItemClasses.disabled,
          className,
        )}
        >
          <SMenuItemLabel>{label}</SMenuItemLabel>
          {hasSubmenu ? <ArrowRightIcon /> : null}
        </SMenuItem>
        {submenu}
      </MenuItemContext.Provider>
    );
  },
);

MenuItem.displayName = 'MenuItem';

export type { TMenuItemProps };
export { menuItemClasses } from './classes';
export { MenuItem };
export default MenuItem;
