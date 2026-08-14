import styled from '@emotion/styled';
import { TInputSize } from '../input-wrapper/types';
import {
  TSInputDateFieldDayProps,
  TSInputDateFieldDropdownProps,
  TSInputDateFieldTimeWheelHighlightProps,
  TSInputDateFieldTimeWheelItemProps,
  TSInputDateFieldTriggerProps,
  TSInputDateFieldWeekdayProps,
} from './types';

const triggerProps = new Set(['variant', 'size', 'color', 'open']);
const dropdownProps = new Set(['top', 'left', 'width', 'visible', 'placement']);
const dayProps = new Set([
  'selected',
  'today',
  'outside',
  'disabled',
  'color',
  'variant',
]);
const weekdayProps = new Set(['color']);
const timeHighlightProps = new Set(['color', 'variant']);
const timeItemProps = new Set(['color', 'variant']);

const sizeFont: Record<TInputSize, string> = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const SInputDateField = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
`;

export const SInputDateFieldTrigger = styled('button', {
  shouldForwardProp: (prop) => !triggerProps.has(prop),
})<TSInputDateFieldTriggerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  width: 100%;
  margin: 0;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.text};
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  ${({ theme, size }) => {
    const scale = theme.sizeScale[size];

    return `
      padding: calc(${theme.spacing(theme.gap.sm)} * ${scale})
        calc(${theme.spacing(theme.gap.md)} * ${scale});
      font-size: ${sizeFont[size]};
    `;
  }}

  ${({ theme, variant, color }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          color: ${palette.darker};
          border-color: color-mix(in srgb, ${palette.main} 14%, transparent);

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 20%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 28%, transparent);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${palette.main};
          border-color: color-mix(in srgb, ${palette.main} 36%, transparent);

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 52%, transparent);
            color: ${palette.dark};
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 68%, transparent);
            color: ${palette.darker};
          }
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
          color: ${palette.darker};
          border-color: transparent;

          &:hover:not(:disabled) {
            background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          }

          &[data-open='true'] {
            background-color: color-mix(in srgb, ${palette.main} 10%, transparent);
          }
        `;
    }
  }}
`;

export const SInputDateFieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  flex: 1;
  min-width: 0;
`;

export const SInputDateFieldText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SInputDateFieldPlaceholder = styled.span`
  opacity: 0.5;
`;

export const SInputDateFieldChevron = styled('span', {
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

export const SInputDateFieldDropdown = styled('div', {
  shouldForwardProp: (prop) => !dropdownProps.has(prop),
})<TSInputDateFieldDropdownProps>`
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
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: ${({ theme }) => {
    const black = theme.colors.common.black;

    return `
      0 4px 10px ${black}0a,
      0 1px 4px ${black}08,
      0 1px 2px ${black}05
    `;
  }};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.96)')};
  transform-origin: ${({ placement }) =>
    placement === 'top' ? 'bottom right' : 'top right'};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
`;

export const SInputDateFieldPicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.md)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(theme.gap.md)};
  box-sizing: border-box;
  user-select: none;
`;

export const SInputDateFieldCalendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;

export const SInputDateFieldHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
`;

export const SInputDateFieldMonthLabel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.common.black};
`;

export const SInputDateFieldWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const SInputDateFieldWeekday = styled('div', {
  shouldForwardProp: (prop) => !weekdayProps.has(prop),
})<TSInputDateFieldWeekdayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, color }) => theme.colors[color].main};
`;

export const SInputDateFieldDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const SInputDateFieldDay = styled('button', {
  shouldForwardProp: (prop) => !dayProps.has(prop),
})<TSInputDateFieldDayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.small};
  font-family: inherit;
  font-size: 13px;
  line-height: 1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ outside, disabled }) => (disabled ? 0.35 : outside ? 0.45 : 1)};

  ${({ theme, selected, today, color, variant }) => {
    const palette = theme.colors[color];

    if (selected) {
      switch (variant) {
        case 'surface':
          return `
            color: ${palette.darker};
            background-color: color-mix(in srgb, ${palette.main} 16%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 28%, transparent);
          `;
        case 'outline':
          return `
            color: ${palette.darker};
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 68%, transparent);
          `;
        case 'subtle':
        default:
          return `
            color: ${palette.darker};
            background-color: color-mix(in srgb, ${palette.main} 12%, transparent);
            border-color: transparent;
          `;
      }
    }

    if (today) {
      switch (variant) {
        case 'surface':
          return `
            color: ${palette.darker};
            background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
            border-color: color-mix(in srgb, ${palette.main} 14%, transparent);
          `;
        case 'outline':
          return `
            color: ${palette.main};
            background-color: transparent;
            border-color: color-mix(in srgb, ${palette.main} 36%, transparent);
          `;
        case 'subtle':
        default:
          return `
            color: ${palette.darker};
            background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
            border-color: transparent;
          `;
      }
    }

    return `
      color: ${palette.darker};
      background-color: transparent;
      border-color: transparent;
    `;
  }}

  &:hover:not(:disabled) {
    ${({ theme, selected, color, variant }) => {
      const palette = theme.colors[color];
      if (selected) {
        switch (variant) {
          case 'surface':
            return `background-color: color-mix(in srgb, ${palette.main} 20%, transparent);`;
          case 'outline':
            return `background-color: color-mix(in srgb, ${palette.main} 8%, transparent);`;
          case 'subtle':
          default:
            return `background-color: color-mix(in srgb, ${palette.main} 16%, transparent);`;
        }
      }
      return `background-color: color-mix(in srgb, ${palette.main} 10%, transparent);`;
    }}
  }
`;

export const SInputDateFieldTime = styled.div`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  height: ${36 * 5}px;
  user-select: none;
`;

export const SInputDateFieldActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(theme.gap.sm)};
  padding-top: ${({ theme }) => theme.spacing(theme.gap.xs)};
`;

export const SInputDateFieldTimeWheel = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const SInputDateFieldTimeWheelHighlight = styled('div', {
  shouldForwardProp: (prop) => !timeHighlightProps.has(prop),
})<TSInputDateFieldTimeWheelHighlightProps>`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 1;
  height: 36px;
  transform: translateY(-50%);
  pointer-events: none;
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid transparent;

  ${({ theme, color, variant }) => {
    const palette = theme.colors[color];

    switch (variant) {
      case 'surface':
        return `
          background-color: color-mix(in srgb, ${palette.main} 8%, transparent);
          border-color: color-mix(in srgb, ${palette.main} 14%, transparent);
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-color: color-mix(in srgb, ${palette.main} 36%, transparent);
        `;
      case 'subtle':
      default:
        return `
          background-color: color-mix(in srgb, ${palette.main} 4%, transparent);
          border-color: transparent;
        `;
    }
  }}
`;

export const SInputDateFieldTimeWheelList = styled.div`
  height: 100%;
  overflow-y: auto;
  touch-action: none;
  scrollbar-width: none;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SInputDateFieldTimeWheelSpacer = styled.div`
  flex-shrink: 0;
  pointer-events: none;
`;

export const SInputDateFieldTimeWheelItem = styled('button', {
  shouldForwardProp: (prop) => !timeItemProps.has(prop),
})<TSInputDateFieldTimeWheelItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: ${({ theme, color, variant }) =>
    variant === 'outline'
      ? theme.colors[color].main
      : theme.colors[color].darker};
  cursor: pointer;
  opacity: 0;
  pointer-events: auto;

  &[data-selected='true'] {
    color: ${({ theme, color, variant }) =>
      variant === 'outline'
        ? theme.colors[color].darker
        : theme.colors[color].darker};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
