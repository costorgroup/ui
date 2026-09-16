import React from 'react';
import { SZoomOutIcon } from './styles';
import { TZoomOutIconProps } from './types';

const ZoomOutIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TZoomOutIconProps) => {
  return (
    <SZoomOutIcon
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
        d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zM7.75 8.5a1 1 0 0 0 0 2h3.5a1 1 0 1 0 0-2h-3.5z"
      />
    </SZoomOutIcon>
  );
};

export default ZoomOutIcon;
