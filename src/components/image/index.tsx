import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ImageIcon } from '../../icons';
import { imageClasses } from './classes';
import { SImage, SImageMedia } from './styles';
import { TImageProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const Image = forwardRef<HTMLSpanElement, TImageProps>(
  (
    {
      src,
      width,
      height,
      radius = 'md',
      animation,
      alt = '',
      onLoad,
      onError,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const hasSrc = Boolean(src);
    const imgRef = useRef<HTMLImageElement>(null);
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(!animation);

    useEffect(() => {
      setFailed(false);
      setLoaded(false);
      setVisible(!animation);

      const image = imgRef.current;

      if (image?.complete && image.naturalWidth > 0) {
        setLoaded(true);
      }
    }, [src, animation]);

    const isFallback = !hasSrc || failed;
    const showImage = hasSrc && !failed && loaded;

    useEffect(() => {
      if (!animation) {
        setVisible(true);
        return;
      }

      if (!isFallback && !loaded) {
        setVisible(false);
        return;
      }

      setVisible(false);

      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [animation, isFallback, loaded]);

    return (
      <SImage
        {...mergeSlotProps(
          {
            ref,
            width,
            height,
            radius,
            showFallback: isFallback,
            'data-slot': 'image',
            className: mergeClasses(imageClasses.root, className),
          },
          slotProps?.root,
        )}
      >
        {isFallback ? (
          <SImageMedia
            {...mergeSlotProps(
              {
                animation,
                visible,
                'data-slot': 'fallback',
                className: imageClasses.fallback,
              },
              slotProps?.fallback,
            )}
          >
            <ImageIcon />
          </SImageMedia>
        ) : null}
        {hasSrc && !failed ? (
          <SImageMedia
            {...mergeSlotProps(
              {
                animation,
                visible: showImage ? visible : false,
                'data-slot': 'media',
                className: imageClasses.media,
              },
              slotProps?.media,
            )}
          >
            <img
              {...props}
              ref={imgRef}
              src={src ?? undefined}
              alt={alt}
              onLoad={(event) => {
                setLoaded(true);
                onLoad?.(event);
              }}
              onError={(event) => {
                setFailed(true);
                setLoaded(false);
                onError?.(event);
              }}
            />
          </SImageMedia>
        ) : null}
      </SImage>
    );
  },
);

Image.displayName = 'Image';

export type {
  TImageProps,
  TImageSlotProps,
  TImageRadius,
  TImageAnimation,
} from './types';
export { imageClasses } from './classes';
export { Image };
export default Image;
