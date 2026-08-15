import { ReactElement } from 'react';

export type TClickAwayMouseEvent =
  | 'onClick'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onPointerDown'
  | false;

export type TClickAwayTouchEvent = 'onTouchStart' | 'onTouchEnd' | false;

export type TClickAwayListenerProps = {
  children: ReactElement;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  mouseEvent?: TClickAwayMouseEvent;
  touchEvent?: TClickAwayTouchEvent;
};
