import React from 'react';
import { SCheckIcon } from './styles';
import { TCheckIconProps } from './types';

const CheckIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TCheckIconProps) => {
  return (
    <SCheckIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="m4 12 5.5 6L20 6"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SCheckIcon>
  );
};

export default CheckIcon;
