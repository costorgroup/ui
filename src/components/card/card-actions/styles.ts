import styled from '@emotion/styled';
import { TCardActionsJustify } from './types';

type TSCardActionsProps = {
  justify: TCardActionsJustify;
};

const customProps = new Set(['justify']);

const justifyMap: Record<TCardActionsJustify, string> = {
  start: 'flex-start',
  end: 'flex-end',
  'space-between': 'space-between',
};

export const SCardActions = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardActionsProps>`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ justify }) => justifyMap[justify]};
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding: 0 ${({ theme }) => theme.spacing(theme.gap.xl)}
    ${({ theme }) => theme.spacing(theme.gap.xl)};

  &:first-child {
    padding-top: ${({ theme }) => theme.spacing(theme.gap.xl)};
  }
`;
