import React from 'react';
import { SArrowTopIcon } from './styles';
import { TArrowTopIconProps } from './types';

const ArrowTopIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TArrowTopIconProps) => {
  return (
    <SArrowTopIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 9.414-6.293 6.293a1 1 0 0 1-1.414-1.414l6.646-6.647a1.5 1.5 0 0 1 2.122 0l6.646 6.647a1 1 0 0 1-1.414 1.414L12 9.414z"
      />
    </SArrowTopIcon>
  );
};

export default ArrowTopIcon;
