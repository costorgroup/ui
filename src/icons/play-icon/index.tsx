import React from 'react';
import { SPlayIcon } from './styles';
import { TPlayIconProps } from './types';

const PlayIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TPlayIconProps) => {
  return (
    <SPlayIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.2 4.64c-.74-.45-1.7.08-1.7.94v12.84c0 .86.96 1.39 1.7.94l10.48-6.42c.7-.43.7-1.45 0-1.88L8.2 4.64z"
      />
    </SPlayIcon>
  );
};

export default PlayIcon;
