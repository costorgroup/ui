import styled from '@emotion/styled';
import { tabClasses } from '../../tabs/tab/classes';
import { tabsClasses } from '../../tabs/classes';
import { inputDropdownPanelStyles } from '../dropdown-styles';
import { inputInnerResetStyles } from '../variant-styles';
import { CHROME_FILL, CHROME_FOCUS } from '../../../idle-variant-styles';
import { chromeOpaqueFill } from '../../../surface';
import { TInputSize } from '../input-wrapper/types';
import { TSInputEmojiFieldDropdownProps } from './types';

const triggerProps = new Set(['size']);
const dropdownProps = new Set(['top', 'left', 'width', 'visible', 'placement']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputEmojiField = styled('div', {
  shouldForwardProp: (prop) => prop !== 'customTrigger',
})<{ customTrigger: boolean }>`
  position: relative;
  display: inline-flex;
  width: ${({ customTrigger }) => (customTrigger ? 'auto' : '100%')};
  box-sizing: border-box;
`;

export const SInputEmojiFieldCustomTrigger = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const SInputEmojiFieldTrigger = styled('button', {
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<{ size: TInputSize }>`
  ${inputInnerResetStyles}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: inherit;
  color: inherit;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}
`;

export const SInputEmojiFieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputEmojiFieldGlyph = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35em;
  height: 1.35em;
  flex-shrink: 0;
  font-size: 1.15em;
  line-height: 1;
`;

export const SInputEmojiFieldText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SInputEmojiFieldPlaceholder = styled.span`
  opacity: 0.5;
`;

export const SInputEmojiFieldChevron = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const SInputEmojiFieldDropdown = styled('div', {
  shouldForwardProp: (prop) => !dropdownProps.has(prop),
})<TSInputEmojiFieldDropdownProps>`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  box-sizing: border-box;
  width: ${({ width }) => `${width}px`};
  max-width: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding: ${({ theme }) => theme.spacing(theme.gap.sm)};
  border-radius: ${({ theme }) => theme.radius.medium};
  ${({ theme }) => inputDropdownPanelStyles(theme)}
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: ${({ placement }) =>
    placement === 'top' ? 'bottom right' : 'top right'};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;

export const SInputEmojiFieldCategories = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;

  .${tabsClasses.root} {
    width: 100%;
    max-width: 100%;
    scrollbar-width: none;
  }

  .${tabsClasses.root}::-webkit-scrollbar {
    display: none;
  }

  .${tabClasses.root} {
    padding: 4px 8px;
    font-size: 18px;
    line-height: 1;
  }
`;

export const SInputEmojiFieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 2px;
  max-height: 220px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SInputEmojiFieldOption = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.small};
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;

  &[aria-selected='true'] {
    background-color: ${({ theme }) => chromeOpaqueFill(theme, CHROME_FILL)};
  }

  &[data-highlighted='true'],
  &:hover {
    background-color: ${({ theme }) => chromeOpaqueFill(theme, CHROME_FOCUS)};
    box-shadow: inset 0 0 0 2px
      ${({ theme }) => theme.colors.default.main};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.default.main};
    outline-offset: 1px;
  }
`;

export const SInputEmojiFieldEmpty = styled.div`
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  color: ${({ theme }) => theme.colors.default.main};
  opacity: 0.5;
  font-size: 13px;
  text-align: center;
`;
