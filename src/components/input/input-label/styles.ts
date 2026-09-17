import styled from '@emotion/styled';
import { TInputLabelProps } from './types';

type TSInputLabelProps = Pick<TInputLabelProps, 'size'> & {
  disabled?: boolean;
  focused?: boolean;
};

const customProps = new Set(['size', 'disabled', 'focused']);

export const SInputLabel = styled('label', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputLabelProps>`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  max-width: 100%;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing(0.5)};
  font-family: inherit;
  font-size: ${({ theme, size = 'sm' }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme, disabled }) =>
    disabled ? theme.surfaces.muted : theme.surfaces.ink};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  user-select: none;
`;

export const SInputLabelRequired = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
`;
