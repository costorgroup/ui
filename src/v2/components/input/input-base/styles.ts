import styled from '@emotion/styled';
import { TInputBaseProps } from './types';

type TSInputBaseProps = Pick<
  TInputBaseProps,
  'direction' | 'fullWidth' | 'justify' | 'align'
>;

const customProps = new Set(['direction', 'fullWidth', 'justify', 'align']);

export const SInputBase = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputBaseProps>`
  display: flex;
  width: ${({ fullWidth = false }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  box-sizing: border-box;
  flex-direction: ${({ direction = 'vertical' }) => {
    switch (direction) {
      case 'horizontal':
        return 'row';
      case 'horizontal-reverse':
        return 'row-reverse';
      case 'vertical':
      default:
        return 'column';
    }
  }};
  align-items: ${({ direction = 'vertical', align }) => {
    if (align) {
      return align;
    }

    return direction === 'vertical' ? 'stretch' : 'center';
  }};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  gap: ${({ theme }) => theme.spacing(1)};
`;
