import React from 'react';
import { SSettingsIcon } from './styles';
import { TSettingsIconProps } from './types';

const SettingsIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TSettingsIconProps) => {
  return (
    <SSettingsIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2.57 2.57 18.86 18.86"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.841 4.713 10.168 2.576h3.664l.327 2.137a7.6 7.6 0 0 1 1.467.608l1.742-1.28 2.591 2.591-1.28 1.742a7.6 7.6 0 0 1 .608 1.467l2.137.327v3.664l-2.137.327a7.6 7.6 0 0 1-.608 1.467l1.28 1.742-2.591 2.591-1.742-1.28a7.6 7.6 0 0 1-1.467.608l-.327 2.137h-3.664l-.327-2.137a7.6 7.6 0 0 1-1.467-.608l-1.742 1.28-2.591-2.591 1.28-1.742a7.6 7.6 0 0 1-.608-1.467l-2.137-.327v-3.664l2.137-.327a7.6 7.6 0 0 1 .608-1.467l-1.28-1.742 2.591-2.591 1.742 1.28a7.6 7.6 0 0 1 1.467-.608ZM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
      />
    </SSettingsIcon>
  );
};

export default SettingsIcon;
