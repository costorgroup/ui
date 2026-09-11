import styled from '@emotion/styled';
import { TInputLabelProps } from './types';

type TSInputLabelProps = Pick<TInputLabelProps, 'size'>;

const customProps = new Set(['size']);

export const SInputLabel = styled('label', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputLabelProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  font-family: inherit;
  font-size: ${({ theme, size = 'sm' }) => theme.typography.text[size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.palette.base.main};
  user-select: none;
`;

export const SInputLabelRequired = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
`;
