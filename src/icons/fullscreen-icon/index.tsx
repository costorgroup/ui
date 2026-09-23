import React from 'react';
import { SFullscreenIcon } from './styles';
import { TFullscreenIconProps } from './types';

const FullscreenIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TFullscreenIconProps) => {
  return (
    <SFullscreenIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2 2 20.01 20.01"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"
      />
    </SFullscreenIcon>
  );
};

export default FullscreenIcon;
