import { useContext } from 'react';
import {
  FloatingActionsContext,
  TFloatingActionsContextValue,
} from '../../providers/floating-actions/context';

const useFloatingActions = (): TFloatingActionsContextValue => {
  const context = useContext(FloatingActionsContext);

  if (!context) {
    throw new Error(
      'useFloatingActions must be used within a FloatingActionsProvider',
    );
  }

  return context;
};

export { useFloatingActions };
export default useFloatingActions;
