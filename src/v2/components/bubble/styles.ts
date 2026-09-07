import styled from '@emotion/styled';
import { TSBubbleProps } from './types';

const customProps = new Set(['align', 'variant']);

export const SBubble = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBubbleProps>`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;

  &:has([data-bubble-reactions][data-side='bottom']) {
    padding-bottom: 12px;
  }

  &:has([data-bubble-reactions][data-side='top']) {
    padding-top: 12px;
  }
`;

export const SBubbleRow = styled('div', {
  shouldForwardProp: (prop) => prop !== 'align',
})<{ align: TSBubbleProps['align'] }>`
  position: relative;
  display: flex;
  flex-direction: ${({ align }) => (align === 'end' ? 'row-reverse' : 'row')};
  align-items: center;
  width: 100%;
  min-width: 0;
`;
