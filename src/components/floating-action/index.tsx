import React from 'react';
import { createPortal } from 'react-dom';
import { useFloatingActions } from '../../hooks/use-floating-actions';
import { TFloatingActionProps } from './types';

const FloatingAction = ({ children }: TFloatingActionProps) => {
  const { slot } = useFloatingActions();

  if (!slot) {
    return null;
  }

  return createPortal(children, slot);
};

FloatingAction.displayName = 'FloatingAction';

export type { TFloatingActionProps } from './types';
export { FloatingAction };
export default FloatingAction;
