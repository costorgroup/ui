import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { gradientCardClasses } from './classes';
import { SGradientCard } from './styles';
import { TGradientCardProps } from './types';

const GradientCard = forwardRef<HTMLDivElement, TGradientCardProps>(
  (
    { children, radius = 'large', color = 'primary', padding = 'xl', className, ...props },
    ref,
  ) => {
    return (
      <SGradientCard
        ref={ref}
        radius={radius}
        color={color}
        padding={padding}
        {...props}
        className={mergeClasses(
          gradientCardClasses.root,
          className,
        )}
      >
        {children}
      </SGradientCard>
    );
  },
);

GradientCard.displayName = 'GradientCard';

export type { TGradientCardProps };
export { gradientCardClasses } from './classes';
export { GradientCard };
export default GradientCard;
