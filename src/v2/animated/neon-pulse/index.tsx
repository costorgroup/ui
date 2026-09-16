import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAnimatedPlay } from '../use-animated-play';
import { neonPulseClasses } from './classes';
import { SNeonContent, SNeonPulse, SNeonRing } from './styles';
import { TNeonPulseProps } from './types';

const NeonPulse = forwardRef<HTMLDivElement, TNeonPulseProps>(
  (
    {
      children,
      play = 'hover',
      color,
      thickness = 2,
      duration = 1.4,
      radius = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const { rootProps } = useAnimatedPlay(play);
    const neonColor = color ?? theme.palette.info.main;

    return (
      <SNeonPulse
        ref={ref}
        color={neonColor}
        thickness={thickness}
        duration={duration}
        radius={radius}
        {...rootProps}
        {...props}
        className={mergeClasses(neonPulseClasses.root, className)}
      >
        <SNeonRing className={neonPulseClasses.ring} aria-hidden />
        <SNeonContent className={neonPulseClasses.content}>
          {children}
        </SNeonContent>
      </SNeonPulse>
    );
  },
);

NeonPulse.displayName = 'NeonPulse';

export type { TNeonPulseProps } from './types';
export { neonPulseClasses } from './classes';
export { NeonPulse };
export default NeonPulse;
