import styled from '@emotion/styled';

export const SAppBarLogo = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
  gap: var(--app-bar-gap, 0.5rem);
  min-width: 0;
  margin-right: auto;
  color: inherit;
  font: inherit;
  line-height: 0;
  text-decoration: none;

  a {
    display: inline-flex;
    align-items: center;
    gap: inherit;
    color: inherit;
    font: inherit;
    line-height: 0;
    text-decoration: none;
  }

  img,
  svg {
    display: block;
    width: auto;
    height: var(--app-bar-logo-height, 2rem);
  }

  span {
    line-height: 1.2;
    white-space: nowrap;
  }
`;
