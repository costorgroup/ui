import React from 'react';
import { SMastercardLogo } from './styles';
import { TMastercardLogoProps } from './types';

const MastercardLogo = ({
  width = 45,
  height = 28,
  variant = 'clean',
  ...props
}: TMastercardLogoProps) => {
  const realistic = variant === 'realistic';

  return (
    <SMastercardLogo
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-0.161 0.051 640.293 395.554"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        fill={realistic ? '#ff5f00' : '#FFFFFF'}
        d="M319.986 42.353A197.777 197.777 0 0 0 319.986 353.357 197.777 197.777 0 0 0 319.986 42.353z"
      />
      <path
        fill={realistic ? '#eb001b' : '#FFFFFF'}
        fillOpacity={realistic ? undefined : 0.8}
        d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z"
      />
      <path
        fill={realistic ? '#f79e1b' : '#FFFFFF'}
        fillOpacity={realistic ? undefined : 0.8}
        d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z"
      />
    </SMastercardLogo>
  );
};

export default MastercardLogo;
