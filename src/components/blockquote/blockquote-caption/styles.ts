import styled from '@emotion/styled';
import { Text } from '../../text';

export const SBlockquoteCaption = styled(Text)`
  &::before {
    content: '—';
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;
