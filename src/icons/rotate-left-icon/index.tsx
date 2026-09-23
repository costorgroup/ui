import React from 'react';
import { SRotateLeftIcon } from './styles';
import { TRotateLeftIconProps } from './types';

const RotateLeftIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TRotateLeftIconProps) => {
  return (
    <SRotateLeftIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2.24 2.31 19.01 19.01"
      fill="none"
      {...props}
    >
      <path
        d="M7.5 8.5H3.5V4.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.8 8.2A8.5 8.5 0 1 1 4.4 16.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SRotateLeftIcon>
  );
};

export default RotateLeftIcon;
