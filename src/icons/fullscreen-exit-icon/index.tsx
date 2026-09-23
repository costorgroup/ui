import React from 'react';
import { SFullscreenExitIcon } from './styles';
import { TFullscreenExitIconProps } from './types';

const FullscreenExitIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TFullscreenExitIconProps) => {
  return (
    <SFullscreenExitIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2 2 20 20"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"
      />
    </SFullscreenExitIcon>
  );
};

export default FullscreenExitIcon;
