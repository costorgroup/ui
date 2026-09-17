import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardImageClasses } from './classes';
import { SCardImage } from './styles';
import { TCardImageProps } from './types';

const CardImage = forwardRef<HTMLDivElement, TCardImageProps>(
  ({ children, className, ...props }, ref) => (
    <SCardImage
      ref={ref}
      data-slot="card-image"
      {...props}
      className={mergeClasses(cardImageClasses.root, className)}
    >
      {children}
    </SCardImage>
  ),
);

CardImage.displayName = 'CardImage';

export type { TCardImageProps } from './types';
export { cardImageClasses } from './classes';
export { CardImage };
export default CardImage;
