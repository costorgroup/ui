import React from 'react';
import { SMirrorVerticalIcon } from './styles';
import { TMirrorVerticalIconProps } from './types';

const MirrorVerticalIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TMirrorVerticalIconProps) => {
  return (
    <SMirrorVerticalIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="3.5 3.5 17 17"
      fill="none"
      {...props}
    >
      <path fill="currentColor" d="M12 3.5 17.5 10h-11L12 3.5z" />
      <path fill="currentColor" d="M12 20.5 17.5 14h-11L12 20.5z" />
      <path
        d="M4.5 12h15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0.1 3.2"
      />
    </SMirrorVerticalIcon>
  );
};

export default MirrorVerticalIcon;
