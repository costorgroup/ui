import React from 'react';
import { SFileIcon } from './styles';
import { TFileIconProps } from './types';

const FileIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TFileIconProps) => {
  return (
    <SFileIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.2 2A2.2 2.2 0 0 0 4 4.2v15.6A2.2 2.2 0 0 0 6.2 22h11.6a2.2 2.2 0 0 0 2.2-2.2V8.83a2.2 2.2 0 0 0-.64-1.56l-4.43-4.43A2.2 2.2 0 0 0 13.37 2H6.2zm7.05 1.8 4.95 4.95h-3.4c-.86 0-1.55-.7-1.55-1.55V3.8z"
      />
    </SFileIcon>
  );
};

export default FileIcon;
