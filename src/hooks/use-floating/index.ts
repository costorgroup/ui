import { useContext } from 'react';
import {
  FloatingContext,
  TFloatingContextValue,
} from '../../providers/floating/context';

const useFloating = (): TFloatingContextValue => {
  const context = useContext(FloatingContext);

  if (!context) {
    throw new Error('useFloating must be used within a FloatingProvider');
  }

  return context;
};

export { useFloating };
export default useFloating;
