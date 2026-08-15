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
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.25 3a.75.75 0 0 1 .75.75v2.5A1.75 1.75 0 0 1 8.25 8h-2.5a.75.75 0 0 1 0-1.5h2.4a.1.1 0 0 0 .1-.1v-2.4A.75.75 0 0 1 9.25 3zm5.5 0a.75.75 0 0 1 .75.75v2.4c0 .055.045.1.1.1h2.4a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 14 6.25v-2.5A.75.75 0 0 1 14.75 3zM5.75 16a.75.75 0 0 1 .75.75v2.4c0 .055.045.1.1.1h2.4a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 4 18.25v-2.5a.75.75 0 0 1 .75-.75zm12.5 0a.75.75 0 0 1 .75.75v2.5A1.75 1.75 0 0 1 17.25 21h-2.5a.75.75 0 0 1 0-1.5h2.4a.1.1 0 0 0 .1-.1v-2.4a.75.75 0 0 1 .75-.75z"
      />
    </SFullscreenExitIcon>
  );
};

export default FullscreenExitIcon;
