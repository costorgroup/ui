import React, {
  Children,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { avatarGroupClasses } from './classes';
import Avatar from '../avatar';
import { AvatarGroupContext } from '../avatar/context';
import { SAvatarGroup } from './styles';
import { TAvatarGroupRootProps } from './types';

const AvatarGroup = forwardRef<HTMLDivElement, TAvatarGroupRootProps>(
  (
    {
      children,
      max = 5,
      total,
      spacing = 'medium',
      size = 'md',
      radius = 'circle',
      renderSurplus,
      className,
      ...props
    },
    ref,
  ) => {
    const items = Children.toArray(children).filter(
      (child): child is ReactElement => isValidElement(child),
    );

    const clampedMax = max < 2 ? 2 : max;
    const totalAvatars = total ?? items.length;
    const maxAvatars = Math.min(
      items.length,
      totalAvatars > clampedMax ? clampedMax - 1 : clampedMax,
    );
    const surplus = Math.max(totalAvatars - maxAvatars, 0);
    const visible = items.slice(0, maxAvatars);

    let surplusNode: ReactNode = null;

    if (surplus > 0) {
      surplusNode = (
        <Avatar size={size} radius={radius} aria-label={`${surplus} more`}>
          {renderSurplus ? renderSurplus(surplus) : `+${surplus}`}
        </Avatar>
      );
    }

    return (
      <AvatarGroupContext.Provider value={{ size, radius }}>
        <SAvatarGroup ref={ref} spacing={spacing} size={size} {...props}
        className={mergeClasses(
          avatarGroupClasses.root,
          className,
        )}>
          {surplusNode}
          {[...visible].reverse()}
        </SAvatarGroup>
      </AvatarGroupContext.Provider>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export { avatarGroupClasses } from './classes';
export { AvatarGroup };
export default AvatarGroup;
