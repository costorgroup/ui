import React from 'react';
import { SChatDotsIcon } from './styles';
import { TChatDotsIconProps } from './types';

const ChatDotsIcon = ({
  width = '1.25em',
  height = '1.25em',
  ...props
}: TChatDotsIconProps) => {
  return (
    <SChatDotsIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="2 1.88 20 20"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 3.5A2.5 2.5 0 0 0 2 6v8a2.5 2.5 0 0 0 2.5 2.5h1.25v3a.75.75 0 0 0 1.28.53l3.53-3.53H19.5A2.5 2.5 0 0 0 22 14V6a2.5 2.5 0 0 0-2.5-2.5h-15ZM8 11.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm4 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm4 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      />
    </SChatDotsIcon>
  );
};

export default ChatDotsIcon;
