import React from 'react';
import { SArrowBottomIcon } from './styles';
import { TArrowBottomIconProps } from './types';

const ArrowBottomIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TArrowBottomIconProps) => {
  return (
    <SArrowBottomIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 14.586 6.293-6.293a1 1 0 1 1 1.414 1.414l-6.646 6.647a1.5 1.5 0 0 1-2.122 0L4.293 9.707a1 1 0 0 1 1.414-1.414L12 14.586z"
      />
    </SArrowBottomIcon>
  );
};

export default ArrowBottomIcon;
