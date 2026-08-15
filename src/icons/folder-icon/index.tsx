import React from 'react';
import { SFolderIcon } from './styles';
import { TFolderIconProps } from './types';

const FolderIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TFolderIconProps) => {
  return (
    <SFolderIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.4 4.25h-5.2A2.2 2.2 0 0 0 2 6.45v11.3A2.2 2.2 0 0 0 4.2 20h15.6a2.2 2.2 0 0 0 2.2-2.2V8.7a2.2 2.2 0 0 0-2.2-2.2h-7.37L10.73 4.7a1.7 1.7 0 0 0-1.33-.45z"
      />
    </SFolderIcon>
  );
};

export default FolderIcon;
