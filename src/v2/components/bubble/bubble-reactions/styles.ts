import styled from '@emotion/styled';
import { CHROME_FILL, CHROME_HOVER } from '../../../idle-variant-styles';
import { colorMix, colorMixBase } from '../../../surface';
import { TSBubbleReactionsProps } from '../types';

const customProps = new Set(['side', 'align']);

export const SBubbleReactions = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSBubbleReactionsProps>`
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
  padding: 2px 6px;
  border: 1px solid
    ${({ theme }) => colorMix(theme.colors.base.contrastText, CHROME_HOVER)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) =>
    colorMixBase(
      theme.colors.base.contrastText,
      CHROME_FILL,
      theme.colors.base.main,
    )};
  font-size: 12px;
  line-height: 1.2;
  ${({ side }) => (side === 'top' ? 'top: -10px;' : 'bottom: -10px;')}
  ${({ align }) => (align === 'end' ? 'right: 8px;' : 'left: 8px;')}

  &[data-clickable] {
    cursor: pointer;
  }
`;

export const SBubbleReactionItem = styled.span`
  display: inline-flex;
  align-items: center;
  transform-origin: center;
  animation: cui-bubble-reaction-in 0.22s cubic-bezier(0.32, 1.15, 0.32, 1)
    both;

  @keyframes cui-bubble-reaction-in {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
