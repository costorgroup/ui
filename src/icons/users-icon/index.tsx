import React from 'react';
import { SUsersIcon } from './styles';
import { TUsersIconProps } from './types';

const UsersIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TUsersIconProps) => {
  return (
    <SUsersIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="3.49 4.62 18.26 18.26"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.5 8.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM16.5 14c2.9 0 5.25 1.79 5.25 4v1a1 1 0 0 1-1 1h-3.02a5.5 5.5 0 0 0 .27-1.71c0-1.62-.74-3.07-1.92-4.08.13-.14.28-.21.42-.21ZM9.75 6.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5ZM9.75 14.75c3.45 0 6.25 2.13 6.25 4.75v.5a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1v-.5c0-2.62 2.8-4.75 6.25-4.75Z"
      />
    </SUsersIcon>
  );
};

export default UsersIcon;
