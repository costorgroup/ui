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
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 4.75A.75.75 0 0 0 7.25 4h-2.5A1.75 1.75 0 0 0 3 5.75v2.5a.75.75 0 0 0 1.5 0v-2.4c0-.056.045-.1.1-.1h2.4A.75.75 0 0 0 8 4.75zm8 0a.75.75 0 0 1 .75-.75h2.5A1.75 1.75 0 0 1 21 5.75v2.5a.75.75 0 0 1-1.5 0v-2.4a.1.1 0 0 0-.1-.1h-2.4A.75.75 0 0 1 16 4.75zM4.75 16a.75.75 0 0 1 .75.75v2.4c0 .055.045.1.1.1h2.4a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 3 18.25v-2.5a.75.75 0 0 1 .75-.75zm14.5 0a.75.75 0 0 1 .75.75v2.5A1.75 1.75 0 0 1 18.25 21h-2.5a.75.75 0 0 1 0-1.5h2.4a.1.1 0 0 0 .1-.1v-2.4a.75.75 0 0 1 .75-.75z"
      />
    </SFullscreenIcon>
  );
};

export default FullscreenIcon;
