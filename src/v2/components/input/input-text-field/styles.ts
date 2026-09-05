import styled from '@emotion/styled';

export const SInputTextField = styled.input`
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

  &::placeholder {
    color: currentColor;
    opacity: 0.5;
  }
`;
