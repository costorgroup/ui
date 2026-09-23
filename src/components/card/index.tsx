import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { cardClasses } from './classes';
import { SCard } from './styles';
import { TCardProps } from './types';

const Card = forwardRef<HTMLDivElement, TCardProps>(
  (
    {
      children,
      elevation = 1,
      variant = 'surface',
      radius = 'xl',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => (
    <SCard
      ref={ref}
      elevation={elevation}
      variant={variant}
      radius={radius}
      size={size}
      data-slot="card"
      {...props}
      className={mergeClasses(cardClasses.root, cardClasses[size], className)}
    >
      {children}
    </SCard>
  ),
);

Card.displayName = 'Card';

export type { TCardProps, TCardSize } from './types';
export type { TCardImageProps } from './card-image';
export type { TCardHeaderProps, TCardHeaderVariant } from './card-header';
export type { TCardTitleProps } from './card-title';
export type { TCardDescriptionProps } from './card-description';
export type { TCardActionProps } from './card-action';
export type { TCardContentProps } from './card-content';
export type { TCardFooterProps, TCardFooterVariant } from './card-footer';
export { cardClasses } from './classes';
export { CardImage, cardImageClasses } from './card-image';
export { CardHeader, cardHeaderClasses } from './card-header';
export { CardTitle, cardTitleClasses } from './card-title';
export { CardDescription, cardDescriptionClasses } from './card-description';
export { CardAction, cardActionClasses } from './card-action';
export { CardContent, cardContentClasses } from './card-content';
export { CardFooter, cardFooterClasses } from './card-footer';
export { Card };
export default Card;
