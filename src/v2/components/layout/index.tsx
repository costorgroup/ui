import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { layoutClasses } from './classes';
import { LayoutContext } from './context';
import { SLayout } from './styles';
import { TLayoutProps } from './types';

const Layout = forwardRef<HTMLDivElement, TLayoutProps>(
  (
    {
      children,
      direction = 'horizontal',
      bordered = false,
      divider = true,
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ direction, divider }),
      [direction, divider],
    );

    return (
      <LayoutContext.Provider value={contextValue}>
        <SLayout
          ref={ref}
          direction={direction}
          bordered={bordered}
          divider={divider}
          {...props}
          className={mergeClasses(
            layoutClasses.root,
            direction === 'vertical'
              ? layoutClasses.vertical
              : layoutClasses.horizontal,
            bordered && layoutClasses.bordered,
            divider && layoutClasses.divider,
            className,
          )}
        >
          {children}
        </SLayout>
      </LayoutContext.Provider>
    );
  },
);

Layout.displayName = 'Layout';

export type { TLayoutProps, TLayoutDirection } from './types';
export { layoutClasses } from './classes';
export { LayoutContext, useLayoutContext } from './context';
export {
  LayoutContent,
  layoutContentClasses,
  type TLayoutContentProps,
} from './layout-content';
export { Layout };
export default Layout;
