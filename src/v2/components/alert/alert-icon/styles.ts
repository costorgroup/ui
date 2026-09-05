import styled from '@emotion/styled';

export const SAlertIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-top: 0.1em;
  color: inherit;
  line-height: 0;

  & > svg {
    display: block;
    width: var(--alert-icon-size);
    height: var(--alert-icon-size);
  }
`;
