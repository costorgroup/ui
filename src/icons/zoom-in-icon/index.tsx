import React from 'react';
import { SZoomInIcon } from './styles';
import { TZoomInIconProps } from './types';

const ZoomInIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TZoomInIconProps) => {
  return (
    <SZoomInIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="1.99 1.99 18.5 18.5"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zM9.5 6.75a1 1 0 0 1 1 1V8.5h.75a1 1 0 1 1 0 2H10.5v.75a1 1 0 1 1-2 0V10.5H7.75a1 1 0 1 1 0-2H8.5V7.75a1 1 0 0 1 1-1z"
      />
    </SZoomInIcon>
  );
};

export default ZoomInIcon;
