import React from 'react';
import { SStarIcon } from './styles';
import { TStarIconProps } from './types';

const StarIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TStarIconProps) => {
  return (
    <SStarIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </SStarIcon>
  );
};

export default StarIcon;
