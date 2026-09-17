import {
  ChangeEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
} from 'react';

export type TEditableMode = 'click' | 'double-click';

export type TEditableChangeEventHandler = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

/** Spread onto whichever element in the "view" branch should open the editor. */
export type TEditableHandlers = {
  onClick?: MouseEventHandler<HTMLElement>;
  onDoubleClick?: MouseEventHandler<HTMLElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  tabIndex: number;
  role: string;
  'aria-disabled'?: boolean;
};

export type TEditableRenderProps = {
  editable: boolean;
  value: string;
  onChange: TEditableChangeEventHandler;
  handlers: TEditableHandlers;
};

export type TEditableProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'onChange' | 'defaultValue' | 'children'
> & {
  render: (props: TEditableRenderProps) => ReactNode;
  mode?: TEditableMode;
  value?: string;
  defaultValue?: string;
  onChange?: TEditableChangeEventHandler;
  editable?: boolean;
  defaultEditable?: boolean;
  disabled?: boolean;
  onEditableChange?: (event: SyntheticEvent | Event, editable: boolean) => void;
};
