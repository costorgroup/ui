import React from 'react';
import { SVolumeIcon } from './styles';
import { TVolumeIconProps } from './types';

const VolumeIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TVolumeIconProps) => {
  return (
    <SVolumeIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 9h2.64l4.12-3.53c.74-.63 1.87-.11 1.87.86v11.34c0 .97-1.13 1.49-1.87.86L7.14 15H4.5A1.5 1.5 0 0 1 3 13.5v-3A1.5 1.5 0 0 1 4.5 9zm11.04-.36a.75.75 0 0 1 1.06.02 5.25 5.25 0 0 1 0 7.35.75.75 0 1 1-1.08-1.04 3.75 3.75 0 0 0 0-5.27.75.75 0 0 1 .02-1.06zm2.2-2.28a.75.75 0 0 1 1.06.04 8.5 8.5 0 0 1 0 11.2.75.75 0 1 1-1.1-1.02 7 7 0 0 0 0-9.16.75.75 0 0 1 .04-1.06z"
      />
    </SVolumeIcon>
  );
};

export default VolumeIcon;
