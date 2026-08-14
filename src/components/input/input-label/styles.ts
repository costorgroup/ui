import styled from '@emotion/styled';
import { TInputLabelProps, TInputSize } from './types';

type TSInputLabelProps = Pick<TInputLabelProps, 'size'>;

const customProps = new Set(['size']);

const typographySizeMap: Record<TInputSize, 'small' | 'medium' | 'large'> = {
  xs: 'small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'large',
};

export const SInputLabel = styled('label', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputLabelProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  font-family: inherit;
  font-size: ${({ theme, size = 'sm' }) =>
    theme.typography.text[typographySizeMap[size]]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.colors.default.main};
  user-select: none;
`;

export const SInputLabelRequired = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
`;
