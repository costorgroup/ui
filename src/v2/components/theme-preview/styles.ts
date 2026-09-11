import styled from '@emotion/styled';
import { TSThemePreviewProps } from './types';

const customProps = new Set(['canvas', 'ink']);

export const SThemePreview = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSThemePreviewProps>`
  --cui-theme-preview-canvas: ${({ canvas }) => canvas};
  --cui-theme-preview-ink: ${({ ink }) => ink};

  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  box-sizing: border-box;
  width: 5.5rem;
  height: 4.375rem;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 1px solid
    color-mix(
      in oklab,
      var(--cui-theme-preview-ink) 22%,
      var(--cui-theme-preview-canvas)
    );
  background-color: var(--cui-theme-preview-canvas);
  box-shadow:
    0 1px 2px
      color-mix(in oklab, var(--cui-theme-preview-ink) 8%, transparent);
  user-select: none;
`;

export const SThemePreviewChrome = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-shrink: 0;
  height: 0.9rem;
  padding: 0 0.3rem;
  background-color: color-mix(
    in oklab,
    var(--cui-theme-preview-ink) 8%,
    var(--cui-theme-preview-canvas)
  );
  border-bottom: 1px solid
    color-mix(
      in oklab,
      var(--cui-theme-preview-ink) 12%,
      var(--cui-theme-preview-canvas)
    );
`;

export const SThemePreviewDot = styled.span`
  flex-shrink: 0;
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 9999px;

  &[data-tone='close'] {
    background-color: #ff5f57;
  }

  &[data-tone='minimize'] {
    background-color: #febc2e;
  }

  &[data-tone='maximize'] {
    background-color: #28c840;
  }
`;

export const SThemePreviewBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
`;

export const SThemePreviewSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  box-sizing: border-box;
  width: 1.55rem;
  padding: 0.28rem 0.22rem;
  background-color: color-mix(
    in oklab,
    var(--cui-theme-preview-ink) 10%,
    var(--cui-theme-preview-canvas)
  );
  border-right: 1px solid
    color-mix(
      in oklab,
      var(--cui-theme-preview-ink) 12%,
      var(--cui-theme-preview-canvas)
    );
`;

export const SThemePreviewContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.18rem;
  min-width: 0;
  padding: 0.28rem;
`;

export const SThemePreviewBar = styled.span`
  display: block;
  flex-shrink: 0;
  height: 0.22rem;
  border-radius: 9999px;
  background-color: color-mix(
    in oklab,
    var(--cui-theme-preview-ink) 22%,
    var(--cui-theme-preview-canvas)
  );
`;

export const SThemePreviewPanel = styled.span`
  display: block;
  flex: 1 1 auto;
  min-height: 0.7rem;
  border-radius: 0.2rem;
  background-color: color-mix(
    in oklab,
    var(--cui-theme-preview-ink) 12%,
    var(--cui-theme-preview-canvas)
  );
`;
