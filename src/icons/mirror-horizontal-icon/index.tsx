import React from 'react';
import { SMirrorHorizontalIcon } from './styles';
import { TMirrorHorizontalIconProps } from './types';

const MirrorHorizontalIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TMirrorHorizontalIconProps) => {
  return (
    <SMirrorHorizontalIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path fill="currentColor" d="M3.5 12 10 6.5v11L3.5 12z" />
      <path fill="currentColor" d="M20.5 12 14 6.5v11l6.5-5.5z" />
      <path
        d="M12 4.5v15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0.1 3.2"
      />
    </SMirrorHorizontalIcon>
  );
};

export default MirrorHorizontalIcon;
