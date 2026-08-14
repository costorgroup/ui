import React from 'react';
import { Global, useTheme } from '@emotion/react';
import { createBaselineStyles } from './styles';

const GlobalStyles = () => {
  const theme = useTheme();
  const overrides =
    typeof theme.globalStyles === 'function'
      ? theme.globalStyles(theme)
      : theme.globalStyles;

  return <Global styles={[createBaselineStyles(theme), overrides]} />;
};

export type { TGlobalStylesProps } from './types';
export { GlobalStyles };
export default GlobalStyles;
