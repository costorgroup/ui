import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { marqueeItemClasses } from './classes';
import { SMarqueeItem } from './styles';
import { TMarqueeItemProps } from './types';

type TMarqueeItemComponent = React.ForwardRefExoticComponent<
  TMarqueeItemProps & React.RefAttributes<HTMLDivElement>
> & {
  isMarqueeItem: true;
};

const MarqueeItem = forwardRef<HTMLDivElement, TMarqueeItemProps>(
  ({ children, className, ...props }, ref) => (
    <SMarqueeItem
      ref={ref}
      {...props}
      className={mergeClasses(marqueeItemClasses.root, className)}
    >
      {children}
    </SMarqueeItem>
  ),
) as TMarqueeItemComponent;

MarqueeItem.displayName = 'MarqueeItem';
MarqueeItem.isMarqueeItem = true;

export type { TMarqueeItemProps } from './types';
export { marqueeItemClasses } from './classes';
export { MarqueeItem };
export default MarqueeItem;
