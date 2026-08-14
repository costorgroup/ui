import React, { forwardRef } from 'react';
import { SBadge, SBadgeContent } from './styles';
import { TBadgeProps } from './types';

const getDisplayContent = (
  badgeContent: TBadgeProps['badgeContent'],
  max: number,
): React.ReactNode => {
  if (typeof badgeContent === 'number' && badgeContent > max) {
    return `${max}+`;
  }

  return badgeContent;
};

const Badge = forwardRef<HTMLSpanElement, TBadgeProps>(
  (
    {
      children,
      badgeContent,
      color = 'primary',
      variant = 'solid',
      size = 'md',
      max = 99,
      showZero = false,
      invisible: invisibleProp = false,
      overlap = 'rectangular',
      anchorOrigin,
      ...props
    },
    ref,
  ) => {
    const vertical = anchorOrigin?.vertical ?? 'top';
    const horizontal = anchorOrigin?.horizontal ?? 'right';
    const isDot = badgeContent == null;
    const isZero = badgeContent === 0 || badgeContent === '0';
    const invisible = invisibleProp || (!isDot && isZero && !showZero);
    const displayContent = isDot ? null : getDisplayContent(badgeContent, max);

    return (
      <SBadge
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        isDot={isDot}
        invisible={invisible}
        overlap={overlap}
        vertical={vertical}
        horizontal={horizontal}
        {...props}
      >
        {children}
        <SBadgeContent
          color={color}
          variant={variant}
          size={size}
          isDot={isDot}
          invisible={invisible}
          overlap={overlap}
          vertical={vertical}
          horizontal={horizontal}
          aria-hidden={invisible || undefined}
        >
          {displayContent}
        </SBadgeContent>
      </SBadge>
    );
  },
);

Badge.displayName = 'Badge';

export type {
  TBadgeProps,
  TBadgeVariant,
  TBadgeSize,
  TBadgeOverlap,
  TBadgeAnchorOrigin,
} from './types';
export { Badge };
export default Badge;
