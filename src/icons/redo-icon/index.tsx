import React from 'react';
import { SRedoIcon } from './styles';
import { TRedoIconProps } from './types';

const RedoIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TRedoIconProps) => {
  return (
    <SRedoIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="4 3.5 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z" />
    </SRedoIcon>
  );
};

export default RedoIcon;
