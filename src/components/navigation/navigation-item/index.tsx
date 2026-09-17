import React, {
  ElementType,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ArrowBottomIcon } from '../../../icons';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { Button } from '../../button';
import { getMenuPosition } from '../../menu/get-coords';
import { NavLink } from '../../nav-link';
import { Portal } from '../../portal';
import { ToggleButton } from '../../toggle-button';
import { NavigationItemsContext } from '../navigation-items/context';
import { navigationItemClasses } from './classes';
import {
  SNavigationItemChevron,
  SNavigationItemPanel,
  SNavigationItemWrapper,
} from './styles';
import { TNavigationItemOwnProps, TNavigationItemProps } from './types';

const VIEWPORT_PADDING = 8;
const PANEL_OFFSET = 8;
const CLOSE_DELAY = 120;

const setRefs = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
};

const NavigationItem = forwardRef(function NavigationItem<
  C extends ElementType = 'a',
>(
  {
    as,
    children,
    active = false,
    disabled = false,
    content,
    className,
    ...props
  }: TNavigationItemProps<C>,
  ref: React.Ref<Element>,
) {
  const group = useContext(NavigationItemsContext);
  const id = useId();
  const isOpen = content != null && group?.openId === id;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openIdRef = useRef(group?.openId);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  openIdRef.current = group?.openId;

  const cancelScheduledClose = useCallback(() => {
    if (closeTimeoutRef.current != null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => {
      if (openIdRef.current === id) {
        group?.setOpenId(null);
      }
    }, CLOSE_DELAY);
  }, [cancelScheduledClose, group, id]);

  const open = useCallback(() => {
    cancelScheduledClose();
    group?.setOpenId(id);
  }, [cancelScheduledClose, group, id]);

  useEffect(() => cancelScheduledClose, [cancelScheduledClose]);

  const updatePosition = useCallback(() => {
    const anchor = triggerRef.current;
    const panel = panelRef.current;

    if (!anchor || !panel) {
      return;
    }

    const next = getMenuPosition(
      anchor.getBoundingClientRect(),
      panel.getBoundingClientRect(),
      'bottom-start',
      PANEL_OFFSET,
      VIEWPORT_PADDING,
      { width: window.innerWidth, height: window.innerHeight },
    );

    setCoords({ top: next.top, left: next.left });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePosition();
  }, [isOpen, updatePosition, content]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleReposition = () => updatePosition();

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, updatePosition]);

  if (content != null) {
    return (
      <SNavigationItemWrapper
        className={navigationItemClasses.wrapper}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <ToggleButton
          ref={(node: HTMLButtonElement | null) => {
            triggerRef.current = node;
            setRefs(ref, node);
          }}
          variant="ghost"
          size="sm"
          active={isOpen}
          onChange={(_event, next) => group?.setOpenId(next ? id : null)}
          aria-expanded={isOpen}
          disabled={disabled}
          data-slot="navigation-item"
          className={mergeClasses(
            navigationItemClasses.root,
            (active || isOpen) && navigationItemClasses.active,
            className,
          )}
        >
          {children}
          <SNavigationItemChevron
            open={isOpen}
            className={navigationItemClasses.chevron}
            aria-hidden
          >
            <ArrowBottomIcon />
          </SNavigationItemChevron>
        </ToggleButton>
        <Portal>
          <SNavigationItemPanel
            ref={panelRef}
            open={isOpen}
            top={coords.top}
            left={coords.left}
            className={navigationItemClasses.panel}
            role="group"
            data-navigation-item-panel=""
            onMouseEnter={cancelScheduledClose}
            onMouseLeave={scheduleClose}
          >
            {content}
          </SNavigationItemPanel>
        </Portal>
      </SNavigationItemWrapper>
    );
  }

  return (
    <Button
      as={(as ?? NavLink) as ElementType}
      ref={ref as React.Ref<HTMLAnchorElement>}
      variant="ghost"
      size="sm"
      active={active}
      aria-disabled={disabled || undefined}
      data-slot="navigation-item"
      {...props}
      className={mergeClasses(
        navigationItemClasses.root,
        active && navigationItemClasses.active,
        className,
      )}
    >
      {children}
    </Button>
  );
}) as TPolymorphicComponent<'a', TNavigationItemOwnProps>;

NavigationItem.displayName = 'NavigationItem';

export type { TNavigationItemProps, TNavigationItemOwnProps } from './types';
export { navigationItemClasses } from './classes';
export { NavigationItem };
export default NavigationItem;
