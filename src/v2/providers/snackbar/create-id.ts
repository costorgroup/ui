export const createSnackbarId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `snackbar-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};
