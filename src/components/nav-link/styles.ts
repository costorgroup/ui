import styled from '@emotion/styled';

// No custom `shouldForwardProp` here on purpose: emotion's default one for a
// plain string tag already treats `as` correctly (see Button/NavigationItem
// for what happens once a custom shouldForwardProp is introduced without
// explicitly excluding 'as').
export const SNavLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;
