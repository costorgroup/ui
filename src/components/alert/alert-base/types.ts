import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor, TThemeRadius } from '../../../theme/types';

export type TAlertVariant = 'solid' | 'subtle' | 'surface';
export type TAlertSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TAlertRadius = keyof TThemeRadius;

/** Cross-axis alignment against the body: vertical for the icon and for
 * actions placed at the end, horizontal for actions placed at the bottom. */
export type TAlertAlign = 'start' | 'center' | 'end';

/** `bottom`: actions under the message. `end`: beside it, on the right. */
export type TAlertActionsPlacement = 'bottom' | 'end';

export type TAlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'title'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  radius?: TAlertRadius;
  closable?: boolean;
};

export type TAlertBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Where AlertActions sit relative to AlertMessage. */
  actionsPlacement?: TAlertActionsPlacement;
};

export type TSAlertBodyProps = {
  actionsPlacement: TAlertActionsPlacement;
};

export type TSAlertBaseProps = {
  color: TPaletteColor;
  variant: TAlertVariant;
  size: TAlertSize;
  radius: TAlertRadius;
  closable: boolean;
};
