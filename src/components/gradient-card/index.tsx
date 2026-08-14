import React, { forwardRef } from 'react';
import { SGradientCard } from './styles';
import { TGradientCardProps } from './types';

const GradientCard = forwardRef<HTMLDivElement, TGradientCardProps>(
  (
    { children, radius = 'large', color = 'primary', padding = 'xl', ...props },
    ref,
  ) => {
    return (
      <SGradientCard
        ref={ref}
        radius={radius}
        color={color}
        padding={padding}
        {...props}
      >
        {children}
      </SGradientCard>
    );
  },
);

GradientCard.displayName = 'GradientCard';

export type { TGradientCardProps };
export { GradientCard };
export default GradientCard;
