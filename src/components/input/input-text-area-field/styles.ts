import styled from '@emotion/styled';

type TSInputTextAreaFieldProps = {
  autoGrow: boolean;
};

const customProps = new Set(['autoGrow']);

export const SInputTextAreaField = styled('textarea', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSInputTextAreaFieldProps>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: inherit;
  color: inherit;
  resize: none;
  overflow: ${({ autoGrow }) => (autoGrow ? 'hidden' : 'auto')};

  &::placeholder {
    color: currentColor;
    opacity: 0.5;
  }
`;
