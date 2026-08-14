export const UTILITY_CLASS_PREFIX = 'Cui';

export const GLOBAL_STATE_SLOTS = [
  'active',
  'checked',
  'completed',
  'disabled',
  'error',
  'expanded',
  'focused',
  'focusVisible',
  'open',
  'readOnly',
  'required',
  'selected',
] as const;

export type TGlobalStateSlot = (typeof GLOBAL_STATE_SLOTS)[number];

const globalStateSlotSet = new Set<string>(GLOBAL_STATE_SLOTS);

export const isGlobalStateSlot = (slot: string): slot is TGlobalStateSlot =>
  globalStateSlotSet.has(slot);

export const generateUtilityClass = (
  componentName: string,
  slot: string,
  globalStatePrefix = UTILITY_CLASS_PREFIX,
) => {
  if (isGlobalStateSlot(slot)) {
    return `${globalStatePrefix}-${slot}`;
  }

  return `${globalStatePrefix}${componentName}-${slot}`;
};

export const generateUtilityClasses = <Slot extends string>(
  componentName: string,
  slots: readonly Slot[],
): Record<Slot, string> => {
  const classes = {} as Record<Slot, string>;

  for (const slot of slots) {
    classes[slot] = generateUtilityClass(componentName, slot);
  }

  return classes;
};

export const globalStateClasses = generateUtilityClasses(
  '',
  GLOBAL_STATE_SLOTS,
);

export const mergeClasses = (
  ...classNames: Array<string | undefined | null | false>
) => classNames.filter(Boolean).join(' ');

export const isAriaInvalid = (value: unknown) =>
  value === true || value === 'true';
