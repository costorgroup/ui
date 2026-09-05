import React from 'react';
import { Alert } from '../../../components/alert';
import { TSnackbarRender } from '../shared-types';

export const defaultSnackbarRender: TSnackbarRender = ({
  title,
  description,
  color,
  variant = 'solid',
  size = 'md',
  icon,
  onClose,
}) => (
  <Alert
    color={color ?? 'default'}
    variant={variant}
    size={size}
    onClose={onClose}
    icon={icon}
    title={title}
  >
    {description}
  </Alert>
);

export default defaultSnackbarRender;
