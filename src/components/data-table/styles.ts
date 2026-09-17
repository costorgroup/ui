import styled from '@emotion/styled';
import { CardFooter } from '../card/card-footer';

export const SDataTableBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.surfaces.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
`;

export const SDataTableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const SDataTableFooter = styled(CardFooter)`
  justify-content: space-between;
`;
