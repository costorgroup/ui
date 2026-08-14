import React from 'react';
import { SArrowRightIcon } from './styles';
import { TArrowRightIconProps } from './types';

const ArrowRightIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TArrowRightIconProps) => {
  return (
    <SArrowRightIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.293 5.707a1 1 0 0 1 1.414-1.414l6.647 6.646a1.5 1.5 0 0 1 0 2.122l-6.647 6.646a1 1 0 0 1-1.414-1.414L14.586 12 8.293 5.707z"
      />
    </SArrowRightIcon>
  );
};

export default ArrowRightIcon;
