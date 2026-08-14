import { useContext } from 'react';
import { SnackbarContext } from '../../providers/snackbar/context';
import { TSnackbarContextValue } from '../../providers/snackbar/shared-types';

const useSnackbar = (): TSnackbarContextValue => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};

export { useSnackbar };
export default useSnackbar;
