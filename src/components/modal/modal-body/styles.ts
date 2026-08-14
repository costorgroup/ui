import styled from '@emotion/styled';
import { ScrollArea } from '../../scroll-area';

export const SModalBody = styled(ScrollArea)`
  flex: 1 1 auto;
  min-height: 0;
`;

export const SModalBodyPlain = styled('div')`
  flex: 1 1 auto;
  min-height: 0;
  overflow: visible;
`;
