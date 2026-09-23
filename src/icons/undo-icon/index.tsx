import React from 'react';
import { SUndoIcon } from './styles';
import { TUndoIconProps } from './types';

const UndoIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TUndoIconProps) => {
  return (
    <SUndoIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="4 3.5 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z" />
    </SUndoIcon>
  );
};

export default UndoIcon;
