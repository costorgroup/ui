import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { Image } from '../../image';
import { cardImageClasses } from './classes';
import { SCardImage, SCardImageOverlay } from './styles';
import { TCardImageProps } from './types';

const CardImage = forwardRef<HTMLDivElement, TCardImageProps>(
  (
    {
      children,
      className,
      height = 180,
      width = '100%',
      radius = 'none',
      alt = '',
      ...props
    },
    ref,
  ) => {
    return (
      <SCardImage
        ref={ref}
        className={mergeClasses(cardImageClasses.root, className)}
      >
        <Image
          {...props}
          alt={alt}
          width={width}
          height={height}
          radius={radius}
          className={cardImageClasses.media}
        />
        {children != null ? (
          <SCardImageOverlay className={cardImageClasses.overlay}>
            {children}
          </SCardImageOverlay>
        ) : null}
      </SCardImage>
    );
  },
);

CardImage.displayName = 'CardImage';

export type { TCardImageProps };
export { cardImageClasses } from './classes';
export { CardImage };
export default CardImage;
