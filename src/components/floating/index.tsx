import React from 'react';
import { createPortal } from 'react-dom';
import { useFloating } from '../../hooks/use-floating';
import { TFloatingProps } from './types';

const Floating = ({ children }: TFloatingProps) => {
  const { slot } = useFloating();

  if (!slot) {
    return null;
  }

  return createPortal(children, slot);
};

Floating.displayName = 'Floating';

export type { TFloatingProps } from './types';
export { Floating };
export default Floating;
