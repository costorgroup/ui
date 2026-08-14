import styled from '@emotion/styled';
import { TGap } from '../../theme/types';
import { TFlexOwnProps } from './types';

type TSFlexProps = Pick<
  TFlexOwnProps,
  | 'direction'
  | 'align'
  | 'justify'
  | 'wrap'
  | 'alignContent'
  | 'grow'
  | 'shrink'
  | 'basis'
  | 'gap'
  | 'inline'
>;

const customProps = new Set([
  'direction',
  'align',
  'justify',
  'wrap',
  'alignContent',
  'grow',
  'shrink',
  'basis',
  'gap',
  'inline',
]);

export const SFlex = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSFlexProps>`
  display: ${({ inline = false }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-wrap: ${({ wrap }) => wrap};
  align-content: ${({ alignContent }) => alignContent};
  flex-grow: ${({ grow }) => grow};
  flex-shrink: ${({ shrink }) => shrink};
  flex-basis: ${({ basis }) => basis};
  gap: ${({ theme, gap }) => {
    if (gap === undefined) {
      return undefined;
    }

    if (typeof gap === 'number') {
      return theme.spacing(gap);
    }

    if (gap in theme.gap) {
      return theme.spacing(theme.gap[gap as TGap]);
    }

    return gap;
  }};
`;
