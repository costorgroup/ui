import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAnimatedPlay } from '../use-animated-play';
import { wavePingClasses } from './classes';
import { SWaveContent, SWavePing, SWaveRing } from './styles';
import { TWavePingProps } from './types';

const WavePing = forwardRef<HTMLDivElement, TWavePingProps>(
  (
    {
      children,
      play = 'hover',
      color,
      thickness = 2,
      duration = 1.4,
      spread = 0.5,
      radius = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const { rootProps } = useAnimatedPlay(play);
    const waveColor = color ?? theme.palette.info.main;

    return (
      <SWavePing
        ref={ref}
        color={waveColor}
        thickness={thickness}
        duration={duration}
        spread={spread}
        radius={radius}
        {...rootProps}
        {...props}
        className={mergeClasses(wavePingClasses.root, className)}
      >
        <SWaveRing delay={0} className={wavePingClasses.ring} aria-hidden />
        <SWaveRing
          delay={duration / 2}
          className={wavePingClasses.ring}
          aria-hidden
        />
        <SWaveContent className={wavePingClasses.content}>{children}</SWaveContent>
      </SWavePing>
    );
  },
);

WavePing.displayName = 'WavePing';

export type { TWavePingProps } from './types';
export { wavePingClasses } from './classes';
export { WavePing };
export default WavePing;
