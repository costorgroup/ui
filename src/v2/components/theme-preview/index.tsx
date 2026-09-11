import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { themePreviewClasses } from './classes';
import {
  SThemePreview,
  SThemePreviewBar,
  SThemePreviewBody,
  SThemePreviewChrome,
  SThemePreviewContent,
  SThemePreviewDot,
  SThemePreviewPanel,
  SThemePreviewSidebar,
} from './styles';
import {
  TThemePreviewColor,
  TThemePreviewColors,
  TThemePreviewProps,
} from './types';

const toColorPair = (
  colors: TThemePreviewColor | TThemePreviewColors | undefined,
  canvas: string,
  ink: string,
): TThemePreviewColors => {
  if (colors == null) {
    return [canvas, ink];
  }

  if (typeof colors === 'string') {
    return [colors, ink];
  }

  return [colors[0] ?? canvas, colors[1] ?? ink];
};

const ThemePreview = forwardRef<HTMLDivElement, TThemePreviewProps>(
  ({ colors: colorsProp, className, ...props }, ref) => {
    const theme = useTheme();
    const [canvas, ink] = toColorPair(
      colorsProp,
      theme.palette.base.main,
      theme.palette.default.main,
    );

    return (
      <SThemePreview
        ref={ref}
        canvas={canvas}
        ink={ink}
        role="img"
        {...props}
        className={mergeClasses(themePreviewClasses.root, className)}
      >
        <SThemePreviewChrome className={themePreviewClasses.chrome}>
          <SThemePreviewDot
            data-tone="close"
            className={themePreviewClasses.dot}
          />
          <SThemePreviewDot
            data-tone="minimize"
            className={themePreviewClasses.dot}
          />
          <SThemePreviewDot
            data-tone="maximize"
            className={themePreviewClasses.dot}
          />
          <SThemePreviewBar
            className={themePreviewClasses.bar}
            style={{ width: '38%', marginLeft: 'auto' }}
          />
        </SThemePreviewChrome>
        <SThemePreviewBody>
          <SThemePreviewSidebar className={themePreviewClasses.sidebar}>
            <SThemePreviewBar
              className={themePreviewClasses.bar}
              style={{ width: '85%' }}
            />
            <SThemePreviewBar
              className={themePreviewClasses.bar}
              style={{ width: '55%' }}
            />
            <SThemePreviewBar
              className={themePreviewClasses.bar}
              style={{ width: '70%' }}
            />
          </SThemePreviewSidebar>
          <SThemePreviewContent className={themePreviewClasses.content}>
            <SThemePreviewBar
              className={themePreviewClasses.bar}
              style={{ width: '88%' }}
            />
            <SThemePreviewBar
              className={themePreviewClasses.bar}
              style={{ width: '62%' }}
            />
            <SThemePreviewPanel className={themePreviewClasses.panel} />
          </SThemePreviewContent>
        </SThemePreviewBody>
      </SThemePreview>
    );
  },
);

ThemePreview.displayName = 'ThemePreview';

export type {
  TThemePreviewProps,
  TThemePreviewColor,
  TThemePreviewColors,
} from './types';
export { themePreviewClasses } from './classes';
export { ThemePreview };
export default ThemePreview;
