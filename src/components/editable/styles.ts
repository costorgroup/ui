import styled from '@emotion/styled';

export const SEditable = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  max-width: 100%;
  margin: ${({ theme }) =>
    `-${theme.spacing(theme.gap.xs)} -${theme.spacing(theme.gap.sm)}`};
  padding: ${({ theme }) =>
    `${theme.spacing(theme.gap.xs)} ${theme.spacing(theme.gap.sm)}`};
  border-radius: ${({ theme }) => theme.radius.medium};
  cursor: text;
  transition: background-color 0.15s ease;

  &:hover:not([data-editable='true']):not([data-disabled='true']) {
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.common.black} 6%, transparent)`};
  }

  &[data-editable='true'] {
    cursor: auto;
  }

  &[data-disabled='true'] {
    cursor: default;
  }
`;
