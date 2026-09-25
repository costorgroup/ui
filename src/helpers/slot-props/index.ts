import type { MutableRefObject, Ref, RefCallback } from 'react';
import { mergeClasses } from '../generate-utility-classes';

type TAnyProps = Record<string, any>;

/** Props for a component's inner parts, keyed by slot name. */
export type TSlotProps<TSlots extends Record<string, object>> = {
  [K in keyof TSlots]?: Partial<TSlots[K]>;
};

const isHandlerKey = (key: string) => /^on[A-Z]/.test(key);

export const setRef = <T>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = value;
  }
};

export const mergeRefs = <T>(
  ...refs: Array<Ref<T> | undefined>
): Ref<T> | undefined => {
  const defined = refs.filter(Boolean);

  if (defined.length <= 1) {
    return defined[0];
  }

  const merged: RefCallback<T> = (node) => {
    defined.forEach((ref) => setRef(ref, node));
  };

  return merged;
};

/**
 * Merges user `slotProps` onto a slot's internal props. User values win,
 * except `className` / `style` are combined, event handlers are chained
 * (user handler first, then internal) and refs are merged.
 */
export const mergeSlotProps = <const TInternal extends TAnyProps>(
  internal: TInternal,
  external?: TAnyProps | null,
): TInternal => {
  if (!external) {
    return internal;
  }

  const merged: TAnyProps = { ...internal, ...external };

  Object.keys(external).forEach((key) => {
    const own = internal[key];
    const next = external[key];

    if (key === 'className') {
      merged.className = mergeClasses(own, next) || undefined;
    } else if (key === 'style' && own && next) {
      merged.style = { ...own, ...next };
    } else if (key === 'ref') {
      merged.ref = mergeRefs(own, next);
    } else if (
      isHandlerKey(key) &&
      typeof own === 'function' &&
      typeof next === 'function'
    ) {
      merged[key] = (...args: unknown[]) => {
        next(...args);
        own(...args);
      };
    } else if (next === undefined && own !== undefined) {
      merged[key] = own;
    }
  });

  return merged as TInternal;
};
