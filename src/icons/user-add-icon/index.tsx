import React from 'react';
import { SUserAddIcon } from './styles';
import { TUserAddIconProps } from './types';

const UserAddIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TUserAddIconProps) => {
  return (
    <SUserAddIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2.5 1.87 19.76 19.76"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM10 12.5c-4.14 0-7.5 2.69-7.5 6v1.25a1 1 0 0 0 1 1h10.55A6.98 6.98 0 0 1 12.5 16c0-1.29.37-2.5 1-3.52-1.06-.31-2.24-.48-3.5-.48ZM18.5 13.5a.75.75 0 0 1 .75.75V16.5H21.5a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0V18H15.5a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 .75-.75Z"
      />
    </SUserAddIcon>
  );
};

export default UserAddIcon;
