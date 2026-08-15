import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';

export type TEditableMode = 'click' | 'doubleclick';

export type TEditableProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> & {
  render: (editable: boolean) => ReactNode;
  mode?: TEditableMode;
  editable?: boolean;
  defaultEditable?: boolean;
  disabled?: boolean;
  onChange?: (event: SyntheticEvent | Event, editable: boolean) => void;
};
