import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import type {
  TAccordionActionsVisibility,
  TAccordionExpandIconPosition,
} from './accordion-summary/types';
import type { TAccordionSize } from './accordion-base/context';
import type {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from './variant-styles';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TAccordionSummaryProps } from './accordion-summary/types';
import type { TAccordionDetailsProps } from './accordion-details/types';

export type TAccordionRadius = keyof TThemeRadius;

export type TAccordionSlotProps = TSlotProps<{
  summary: TAccordionSummaryProps;
  details: TAccordionDetailsProps;
}>;

export type TAccordionProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'summary' | 'color'
> & {
  summary: ReactNode;
  children?: ReactNode;
  /** Expand icon; rotates 180° on expand. No icon is shown when omitted. */
  icon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
  /** Controls beside the summary (e.g. duplicate / remove icon buttons). */
  actions?: ReactNode;
  actionsVisibility?: TAccordionActionsVisibility;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  /** Identifies the item in an `exclusive` AccordionGroup. */
  value?: string;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionRadius;
  /** What takes the color on expand: the whole item (`all`), only the
   * summary row (`summary`, default) or nothing (`none`). */
  colorScope?: TAccordionColorScope;
  /** Pins text/icon to `palette.contrastText`, same as Button. */
  forceContrastText?: boolean;
  /** Tints mix onto the theme canvas (`opaque`, default) or onto transparent. */
  appearance?: TAccordionAppearance;
  slotProps?: TAccordionSlotProps;
};

export type { TAccordionSize } from './accordion-base/context';
export type {
  TAccordionExpandIconPosition,
  TAccordionActionsVisibility,
} from './accordion-summary/types';
