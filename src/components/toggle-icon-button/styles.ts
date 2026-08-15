import styled from '@emotion/styled';
import { SIconButton } from '../icon-button/styles';
import { toggleInteractionStyles } from '../toggle-button/variant-styles';

export const SToggleIconButton = styled(SIconButton)`
  ${({ theme, variant = 'outline', color = 'primary' }) =>
    toggleInteractionStyles(theme, variant, color)}
`;
