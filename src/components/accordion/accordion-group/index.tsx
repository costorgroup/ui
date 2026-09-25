import React, {
  Children,
  forwardRef,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { mergeSlotProps } from '../../../helpers/slot-props';
import { accordionSummaryClasses } from '../accordion-summary/classes';
import { accordionGroupClasses } from './classes';
import { AccordionGroupContext, TAccordionGroupContextValue } from './context';
import {
  SAccordionGroup,
  SAccordionGroupAdd,
  SAccordionGroupAddIcon,
  SAccordionGroupDragList,
  SAccordionGroupEmpty,
  SAccordionGroupList,
} from './styles';
import { TAccordionGroupProps } from './types';

const PlusIcon = () => (
  <SAccordionGroupAddIcon viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </SAccordionGroupAddIcon>
);

/**
 * Outlined box of accordions separated by dividers. Optionally keeps one
 * item open at a time (`exclusive` / `value`), lets items be dragged by a
 * grip (`onReorder`) and ends with an add row (`onAdd`) — together, a list
 * editor.
 */
const AccordionGroup = forwardRef<HTMLDivElement, TAccordionGroupProps>(
  (
    {
      children,
      color,
      variant,
      size,
      radius = 'md',
      colorScope,
      forceContrastText,
      appearance,
      exclusive: exclusiveProp = false,
      value: valueProp,
      defaultValue = null,
      onValueChange,
      onReorder,
      onAdd,
      addLabel = 'Add',
      addIcon,
      empty,
      slotProps,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const exclusive = exclusiveProp || isControlled;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = isControlled ? valueProp : uncontrolledValue;
    const sortable = onReorder != null;
    const hasItems = Children.toArray(children).length > 0;

    const setValue = useCallback(
      (event: SyntheticEvent, next: string | null) => {
        if (!isControlled) {
          setUncontrolledValue(next);
        }

        onValueChange?.(event, next);
      },
      [isControlled, onValueChange],
    );

    const contextValue = useMemo<TAccordionGroupContextValue>(
      () => ({
        color,
        variant,
        size,
        radius,
        colorScope,
        forceContrastText,
        appearance,
        exclusive,
        value,
        setValue,
        sortable,
      }),
      [
        color,
        colorScope,
        exclusive,
        forceContrastText,
        appearance,
        radius,
        setValue,
        size,
        sortable,
        value,
        variant,
      ],
    );

    const listProps = mergeSlotProps(
      { className: accordionGroupClasses.list },
      slotProps?.list,
    );

    return (
      <AccordionGroupContext.Provider value={contextValue}>
        <SAccordionGroup
          ref={ref}
          radius={radius}
          role="group"
          {...props}
          className={mergeClasses(accordionGroupClasses.root, className)}
        >
          {hasItems &&
            (sortable ? (
              <SAccordionGroupDragList
                lockAxis="y"
                color={color ?? 'primary'}
                dragHandleSelector={`.${accordionSummaryClasses.dragHandle}`}
                onDrop={({ removedIndex, addedIndex }) => {
                  if (
                    removedIndex !== null &&
                    addedIndex !== null &&
                    removedIndex !== addedIndex
                  ) {
                    onReorder(removedIndex, addedIndex);
                  }
                }}
                {...listProps}
              >
                {children}
              </SAccordionGroupDragList>
            ) : (
              <SAccordionGroupList {...listProps}>{children}</SAccordionGroupList>
            ))}
          {!hasItems && empty != null && (
            <SAccordionGroupEmpty
              {...mergeSlotProps(
                { className: accordionGroupClasses.empty },
                slotProps?.empty,
              )}
            >
              {empty}
            </SAccordionGroupEmpty>
          )}
          {onAdd && (
            <SAccordionGroupAdd
              type="button"
              paletteColor={color ?? 'primary'}
              size={size ?? 'md'}
              appearance={appearance ?? 'opaque'}
              aria-label={addLabel}
              title={addLabel}
              onClick={onAdd}
              {...mergeSlotProps(
                { className: accordionGroupClasses.add },
                slotProps?.add,
              )}
            >
              {addIcon ?? <PlusIcon />}
            </SAccordionGroupAdd>
          )}
        </SAccordionGroup>
      </AccordionGroupContext.Provider>
    );
  },
);

AccordionGroup.displayName = 'AccordionGroup';

export type {
  TAccordionGroupProps,
  TAccordionGroupRadius,
  TAccordionGroupSlotProps,
} from './types';
export { accordionGroupClasses } from './classes';
export {
  AccordionGroupContext,
  useAccordionGroupContext,
} from './context';
export { AccordionGroup };
export default AccordionGroup;
