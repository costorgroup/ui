import styled from '@emotion/styled';
import { SButton } from '../button/styles';
import { toggleInteractionStyles } from './variant-styles';

export const SToggleButton = styled(SButton)`
  ${({ theme, variant = 'outline', color = 'primary' }) =>
    toggleInteractionStyles(theme, variant, color)}
`;
