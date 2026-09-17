import React, { forwardRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { qrCodeClasses } from './classes';
import { SQrCode } from './styles';
import { TQrCodeProps } from './types';

// `qrcode` validates its `color` option as a hex string, so `currentColor`
// can't be passed in directly — generate with a placeholder and swap it in
// after, which also lets the mark inherit color from the parent like any
// other currentColor glyph.
const PLACEHOLDER = '#000000';

const QrCode = forwardRef<HTMLDivElement, TQrCodeProps>(
  ({ value, className, ...props }, ref) => {
    const [svg, setSvg] = useState<string | null>(null);

    useEffect(() => {
      let cancelled = false;

      const generate = async () => {
        try {
          const markup = await QRCode.toString(value, {
            type: 'svg',
            errorCorrectionLevel: 'M',
            margin: 1,
            color: {
              dark: PLACEHOLDER,
              light: '#00000000',
            },
          });

          if (!cancelled) {
            setSvg(markup.replace(`stroke="${PLACEHOLDER}"`, 'stroke="currentColor"'));
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
    }, [value]);

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
        className={mergeClasses(qrCodeClasses.root, className)}
      />
    );
  },
);

QrCode.displayName = 'QrCode';

export type { TQrCodeProps } from './types';
export { qrCodeClasses } from './classes';
export { QrCode };
export default QrCode;
