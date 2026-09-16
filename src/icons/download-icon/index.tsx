import React from 'react';
import { SDownloadIcon } from './styles';
import { TDownloadIconProps } from './types';

const DownloadIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TDownloadIconProps) => {
  return (
    <SDownloadIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 8v6H5l7 7 7-7h-4V8H9ZM5 4v2h14V4H5Z"
      />
    </SDownloadIcon>
  );
};

export default DownloadIcon;
