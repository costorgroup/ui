import styled from '@emotion/styled';
import { pressedVariantStyles } from '../button/variant-styles';
import { SIconButton } from '../icon-button/styles';

export const SToggleIconButton = styled(SIconButton)`
  ${({ theme, variant = 'outline', appearance = 'opaque', color = 'default' }) =>
    pressedVariantStyles(
      variant,
      theme.palette[color],
      theme,
      appearance,
      theme.surfaces.background,
    )}
`;
