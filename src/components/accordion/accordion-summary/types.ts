import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';
import { TAccordionSize } from '../accordion-base/context';

export type TAccordionExpandIconPosition = 'left' | 'right';

export type TAccordionActionsVisibility = 'hover' | 'always';

/** `className` and `style` go on the row; every other prop goes on the
 * toggle button (which also gets the ref). */
export type TAccordionSummaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children?: ReactNode;
  /** Rotates 180° on expand. No icon is shown when omitted. */
  expandIcon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
  /** Controls beside the toggle (e.g. duplicate / remove icon buttons). */
  actions?: ReactNode;
  /** `hover` reveals the actions while the row is hovered or focused. */
  actionsVisibility?: TAccordionActionsVisibility;
  /** Drag grip; shown by default in a group with `onReorder`. */
  dragHandle?: boolean;
  dragHandleLabel?: string;
};

export type TSAccordionSummaryProps = {
  paletteColor: TPaletteColor;
  variant: TAccordionVariant;
  expanded: boolean;
  size: TAccordionSize;
  forceContrastText: boolean;
  appearance: TAccordionAppearance;
  colorScope: TAccordionColorScope;
  hasTrailing: boolean;
  actionsVisibility: TAccordionActionsVisibility;
};

export type TSAccordionSummaryButtonProps = {
  paletteColor: TPaletteColor;
  size: TAccordionSize;
};

export type TSAccordionExpandIconProps = {
  expanded: boolean;
};
