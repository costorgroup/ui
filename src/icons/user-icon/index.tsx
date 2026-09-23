import React from 'react';
import { SUserIcon } from './styles';
import { TUserIconProps } from './types';

const UserIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TUserIconProps) => {
  return (
    <SUserIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2.5 2 19 19"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="6" r="4" fill="currentColor" />
      <ellipse cx="12" cy="17" rx="7" ry="4" fill="currentColor" />
    </SUserIcon>
  );
};

export default UserIcon;
