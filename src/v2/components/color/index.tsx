import React, { forwardRef, useId } from 'react';
import { useTheme } from '@emotion/react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { colorClasses } from './classes';
import { pieSlicePath } from './slices';
import { SColor, SColorSwatch } from './styles';
import { TColorProps, TColorValue } from './types';

const SWATCH_CENTER = 50;
const SWATCH_RADIUS = 50;

const toColorList = (
  colors: TColorValue | TColorValue[] | undefined,
  fallback: TColorValue,
): TColorValue[] => {
  if (colors == null) {
    return [fallback];
  }

  return Array.isArray(colors) ? colors : [colors];
};

const ColorSwatch = ({
  colors,
  fallback,
  className,
}: {
  colors: TColorValue[];
  fallback: TColorValue;
  className?: string;
}) => {
  const clipId = `cui-color-${useId().replace(/:/g, '')}`;
  const slices = colors.length > 0 ? colors : [fallback];

  return (
    <SColorSwatch
      viewBox={`0 0 ${SWATCH_CENTER * 2} ${SWATCH_CENTER * 2}`}
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={SWATCH_CENTER} cy={SWATCH_CENTER} r={SWATCH_RADIUS} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {slices.length <= 1 ? (
          <circle
            cx={SWATCH_CENTER}
            cy={SWATCH_CENTER}
            r={SWATCH_RADIUS}
            fill={slices[0] ?? fallback}
          />
        ) : (
          slices.map((fill, index) => {
            const sweep = 360 / slices.length;

            return (
              <path
                key={`${fill}-${index}`}
                d={pieSlicePath(
                  SWATCH_CENTER,
                  SWATCH_CENTER,
                  SWATCH_RADIUS,
                  index * sweep,
                  (index + 1) * sweep,
                )}
                fill={fill}
              />
            );
          })
        )}
      </g>
    </SColorSwatch>
  );
};

const Color = forwardRef<HTMLButtonElement, TColorProps>(
  (
    {
      colors: colorsProp,
      size = 'md',
      selected = false,
      type = 'button',
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const fallback = theme.colors.default.main;
    const colors = toColorList(colorsProp, fallback);

    return (
      <SColor
        ref={ref}
        type={type}
        size={size}
        colors={colors}
        aria-pressed={selected}
        {...props}
        className={mergeClasses(
          colorClasses.root,
          selected && colorClasses.selected,
          className,
        )}
      >
        <ColorSwatch
          colors={colors}
          fallback={fallback}
          className={colorClasses.swatch}
        />
      </SColor>
    );
  },
);

Color.displayName = 'Color';

export type { TColorProps, TColorSize, TColorValue } from './types';
export { colorClasses } from './classes';
export { Color };
export default Color;
