import React from 'react';
import { SMoreHorizontalIcon } from './styles';
import { TMoreHorizontalIconProps } from './types';

const MoreHorizontalIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TMoreHorizontalIconProps) => {
  return (
    <SMoreHorizontalIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 13.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5zm14 0a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5zM13.75 12a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0z"
      />
    </SMoreHorizontalIcon>
  );
};

export default MoreHorizontalIcon;
