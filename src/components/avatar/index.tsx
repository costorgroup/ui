import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { avatarClasses } from './classes';
import { getInitials } from '../../helpers';
import { AvatarGroupContext } from './context';
import { SAvatar } from './styles';
import { TAvatarProps } from './types';

const Avatar = forwardRef<HTMLDivElement, TAvatarProps>(
  (
    {
      name,
      src,
      alt,
      size: sizeProp,
      radius: radiusProp,
      children,
      imgProps,
      className,
      ...props
    },
    ref,
  ) => {
    const group = useContext(AvatarGroupContext);
    const size = sizeProp ?? group?.size ?? 'md';
    const radius = radiusProp ?? group?.radius ?? 'circle';
    const hasSrc = Boolean(src);
    const imgRef = useRef<HTMLImageElement>(null);
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setFailed(false);
      setLoaded(false);

      const image = imgRef.current;

      if (image?.complete && image.naturalWidth > 0) {
        setLoaded(true);
      }
    }, [src]);

    const showImage = hasSrc && !failed && loaded;
    const initials = getInitials(name);
    const label = alt ?? name ?? '';

    return (
      <SAvatar
        ref={ref}
        size={size}
        radius={radius}
        role={showImage || initials || children ? undefined : 'img'}
        aria-label={label || undefined}
        {...props}
        className={mergeClasses(
          avatarClasses.root,
          className,
        )}
      >
        {hasSrc && !failed ? (
          <img
            {...imgProps}
            ref={imgRef}
            src={src ?? undefined}
            alt={label}
            onLoad={(event) => {
              setLoaded(true);
              imgProps?.onLoad?.(event);
            }}
            onError={(event) => {
              setFailed(true);
              setLoaded(false);
              imgProps?.onError?.(event);
            }}
            style={{
              ...imgProps?.style,
              opacity: showImage ? 1 : 0,
            }}
          />
        ) : null}
        {!showImage ? children ?? (initials || null) : null}
      </SAvatar>
    );
  },
);

Avatar.displayName = 'Avatar';

export { avatarClasses } from './classes';
export { Avatar };
export default Avatar;
