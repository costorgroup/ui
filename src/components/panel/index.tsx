import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { panelClasses } from './classes';
import { SPanel } from './styles';
import { TPanelProps } from './types';

const Panel = forwardRef<HTMLDivElement, TPanelProps>(
  (
    {
      children,
      elevation = 1,
      variant = 'surface',
      radius = 'xl',
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => (
    <SPanel
      ref={ref}
      elevation={elevation}
      variant={variant}
      radius={radius}
      fullWidth={fullWidth}
      {...props}
      className={mergeClasses(
        panelClasses.root,
        panelClasses[variant],
        className,
      )}
    >
      {children}
    </SPanel>
  ),
);

Panel.displayName = 'Panel';

export type {
  TPanelProps,
  TPanelRadius,
  TPanelVariant,
  TPanelElevation,
} from './types';
export { panelClasses } from './classes';
export { Panel };
export default Panel;
