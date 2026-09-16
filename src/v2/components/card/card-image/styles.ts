import styled from '@emotion/styled';

export const SCardImage = styled.div`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;

  img,
  video {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;
