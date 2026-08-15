import React from 'react';
import { SStarBorderIcon } from './styles';
import { TStarBorderIconProps } from './types';

const StarBorderIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TStarBorderIconProps) => {
  return (
    <SStarBorderIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </SStarBorderIcon>
  );
};

export default StarBorderIcon;
