import React, {
  Children,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import Avatar from '../avatar';
import { AvatarGroupContext } from '../avatar/context';
import { avatarGroupClasses } from './classes';
import { SAvatarGroup } from './styles';
import { TAvatarGroupRootProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const AvatarGroup = forwardRef<HTMLDivElement, TAvatarGroupRootProps>(
  (
    {
      children,
      max = 5,
      total,
      spacing = 'md',
      size = 'md',
      radius = 'full',
      renderSurplus,
      className,
      slotProps,
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
        <Avatar
          {...mergeSlotProps(
            {
              size,
              radius,
              'aria-label': `${surplus} more`,
            },
            slotProps?.surplus,
          )}
        >
          {renderSurplus ? renderSurplus(surplus) : `+${surplus}`}
        </Avatar>
      );
    }

    return (
      <AvatarGroupContext.Provider value={{ size, radius }}>
        <SAvatarGroup
          ref={ref}
          spacing={spacing}
          size={size}
          {...props}
          className={mergeClasses(avatarGroupClasses.root, className)}
        >
          {surplusNode}
          {[...visible].reverse()}
        </SAvatarGroup>
      </AvatarGroupContext.Provider>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export type {
  TAvatarGroupRootProps as TAvatarGroupProps,
  TAvatarGroupSlotProps,
} from './types';
export type { TAvatarGroupSpacing } from '../avatar/context';
export { avatarGroupClasses } from './classes';
export { AvatarGroup };
export default AvatarGroup;
