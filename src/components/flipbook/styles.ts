import styled from '@emotion/styled';
import { FlipbookBase } from './flipbook-base';

export const SFlipbook = styled(FlipbookBase)``;

export const SFlipbookShell = styled.div`
  --cui-flipbook-width: 720px;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: calc(var(--cui-flipbook-width) * 2);
  max-width: 100%;
  margin-inline: auto;
`;

export const SFlipbookMessage = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 12rem;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 1px dashed ${({ theme }) => theme.palette.common.grey[6]};
  background: ${({ theme }) => theme.palette.common.grey[1]};
  color: ${({ theme }) => theme.palette.common.grey[12]};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.text.sm};
`;

export const SFlipbookPdfPage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${({ theme }) => theme.palette.common.white};
  pointer-events: none;
  user-select: none;
`;
