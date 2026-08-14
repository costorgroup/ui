import styled from '@emotion/styled';
import { ScrollArea } from '../../scroll-area';

export const SDrawerBody = styled(ScrollArea)`
  flex: 1 1 auto;
  min-height: 0;
`;

export const SDrawerBodyPlain = styled('div')`
  flex: 1 0 auto;
  min-height: auto;
  overflow: visible;
`;
