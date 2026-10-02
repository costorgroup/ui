import React from 'react';
import { SFilterIcon } from './styles';
import { TFilterIconProps } from './types';

const FilterIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TFilterIconProps) => {
  return (
    <SFilterIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="3 3 18 18"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5h14l-5.5 7v6.5l-3-1.5v-5L5 5z"
      />
    </SFilterIcon>
  );
};

export default FilterIcon;
