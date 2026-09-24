import styled from '@emotion/styled';
import { ScrollArea } from '../../scroll-area';

export const SCardContent = styled(ScrollArea)`
  flex: 1 1 auto;
  min-height: 0;
`;

export const SCardContentInner = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-inline: var(--card-spacing);
`;
