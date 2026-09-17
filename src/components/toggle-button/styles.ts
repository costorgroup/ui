import styled from '@emotion/styled';
import { SButton } from '../button/styles';
import { pressedVariantStyles } from '../button/variant-styles';

export const SToggleButton = styled(SButton)`
  ${({ theme, variant = 'outline', appearance = 'opaque', color = 'default' }) =>
    pressedVariantStyles(
      variant,
      theme.palette[color],
      theme,
      appearance,
      theme.surfaces.background,
    )}
`;
