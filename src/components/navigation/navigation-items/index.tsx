import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { navigationItemsClasses } from './classes';
import { NavigationItemsContext } from './context';
import { SNavigationItems } from './styles';
import { TNavigationItemsProps } from './types';

const NavigationItems = forwardRef<HTMLDivElement, TNavigationItemsProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const [openId, setOpenId] = useState<string | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    useEffect(() => {
      if (openId === null) {
        return undefined;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node | null;

        if (nodeRef.current?.contains(target)) {
          return;
        }

        if ((target as HTMLElement | null)?.closest?.('[data-navigation-item-panel]')) {
          return;
        }

        setOpenId(null);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpenId(null);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [openId]);

    return (
      <NavigationItemsContext.Provider value={{ openId, setOpenId }}>
        <SNavigationItems
          ref={setRefs}
          data-slot="navigation-items"
          {...props}
          className={mergeClasses(navigationItemsClasses.root, className)}
        >
          {children}
        </SNavigationItems>
      </NavigationItemsContext.Provider>
    );
  },
);

NavigationItems.displayName = 'NavigationItems';

export type { TNavigationItemsProps } from './types';
export { navigationItemsClasses } from './classes';
export { NavigationItemsContext } from './context';
export { NavigationItems };
export default NavigationItems;
