import React from 'react';
import { SUploadIcon } from './styles';
import { TUploadIconProps } from './types';

const UploadIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TUploadIconProps) => {
  return (
    <SUploadIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 16V10H5l7-7 7 7h-4v6H9Zm-4 4v-2h14v2H5Z"
      />
    </SUploadIcon>
  );
};

export default UploadIcon;
