import React, { forwardRef, useEffect, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { qrCodeClasses } from './classes';
import QRCode from 'qrcode';
import { useTheme } from '@emotion/react';
import { SQrCode } from './styles';
import { TQrCodeProps } from './types';

const QrCode = forwardRef<HTMLDivElement, TQrCodeProps>(
  ({ value, color = 'primary', className, ...props }, ref) => {
    const theme = useTheme();
    const [svg, setSvg] = useState<string | null>(null);
    const contrast = theme.colors[color].contrastText;

    useEffect(() => {
      let cancelled = false;

      const generate = async () => {
        try {
          const markup = await QRCode.toString(value, {
            type: 'svg',
            errorCorrectionLevel: 'M',
            margin: 1,
            color: {
              dark: contrast,
              light: '#00000000',
            },
          });

          if (!cancelled) {
            setSvg(markup);
          }
        } catch {
          if (!cancelled) {
            setSvg(null);
          }
        }
      };

      generate();

      return () => {
        cancelled = true;
      };
    }, [value, contrast]);

    if (!svg) {
      return null;
    }

    return (
      <SQrCode
        ref={ref}
        {...props}
        role="img"
        aria-label={props['aria-label'] ?? value}
        dangerouslySetInnerHTML={{ __html: svg }}
      
        className={mergeClasses(
          qrCodeClasses.root,
          className,
        )}
      />
    );
  },
);

QrCode.displayName = 'QrCode';

export type { TQrCodeProps } from './types';
export { qrCodeClasses } from './classes';
export { QrCode };
export default QrCode;
