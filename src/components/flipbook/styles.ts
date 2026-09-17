import styled from '@emotion/styled';
import { CHROME_FILL } from '../../helpers/variant-styles';
import { colorMix, colorMixBase } from '../../helpers/variant-styles/surface';
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
  border: 1px dashed ${({ theme }) => theme.surfaces.border};
  background-color: ${({ theme }) =>
    colorMixBase(theme.surfaces.mixer, CHROME_FILL, theme.surfaces.background)};
  color: ${({ theme }) => colorMix(theme.surfaces.ink, 64)};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.text.sm};
`;

/** The rendered PDF page is a raster of paper, so its letterboxing stays
 * fixed white rather than following the app's light/dark surfaces. */
export const SFlipbookPdfPage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${({ theme }) => theme.palette.common.white};
  pointer-events: none;
  user-select: none;
`;
