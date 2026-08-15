import React from 'react';
import { SVolumeOffIcon } from './styles';
import { TVolumeOffIconProps } from './types';

const VolumeOffIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TVolumeOffIconProps) => {
  return (
    <SVolumeOffIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 9h2.64l4.12-3.53c.74-.63 1.87-.11 1.87.86v11.34c0 .97-1.13 1.49-1.87.86L7.14 15H4.5A1.5 1.5 0 0 1 3 13.5v-3A1.5 1.5 0 0 1 4.5 9zm15.03-3.53a.75.75 0 0 1 0 1.06L10.06 16l-1.06 1.06a.75.75 0 1 1-1.06-1.06L17.41 6.53a.75.75 0 0 1 1.06 0z"
      />
    </SVolumeOffIcon>
  );
};

export default VolumeOffIcon;
