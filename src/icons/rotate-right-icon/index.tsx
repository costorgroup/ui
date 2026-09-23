import React from 'react';
import { SRotateRightIcon } from './styles';
import { TRotateRightIconProps } from './types';

const RotateRightIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TRotateRightIconProps) => {
  return (
    <SRotateRightIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2.74 2.31 19.01 19.01"
      fill="none"
      {...props}
    >
      <path
        d="M16.5 8.5H20.5V4.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2 8.2A8.5 8.5 0 1 0 19.6 16.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SRotateRightIcon>
  );
};

export default RotateRightIcon;
