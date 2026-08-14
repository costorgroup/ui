import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FloatingActionsContext } from './context';
import { floatingActionsLayout, naturalItemsDirectionFor } from './data';
import { SFloatingActionsSlot } from './styles';
import {
  TFloatingActionsItemsDirection,
  TFloatingActionsPosition,
  TFloatingActionsProviderProps,
} from './types';

const insetsFor = (
  position: TFloatingActionsPosition,
  offset: TFloatingActionsProviderProps['offset'],
) => {
  switch (position) {
    case 'top-left':
      return { top: offset, left: offset };
    case 'top':
      return { top: offset, left: '50%', center: 'x' as const };
    case 'top-right':
      return { top: offset, right: offset };
    case 'left':
      return { top: '50%', left: offset, center: 'y' as const };
    case 'right':
      return { top: '50%', right: offset, center: 'y' as const };
    case 'bottom-left':
      return { bottom: offset, left: offset };
    case 'bottom':
      return { bottom: offset, left: '50%', center: 'x' as const };
    case 'bottom-right':
    default:
      return { bottom: offset, right: offset };
  }
};

const FloatingActionsProvider = ({
  children,
  position: positionProp = 'bottom-right',
  itemsDirection: itemsDirectionProp = 'vertical',
  offset = 'md',
}: TFloatingActionsProviderProps) => {
  const [slot, setSlot] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(positionProp);
  const [itemsDirection, setItemsDirection] = useState(itemsDirectionProp);
  const layout = floatingActionsLayout[position][itemsDirection];
  const naturalItemsDirection = naturalItemsDirectionFor(
    position,
    itemsDirection,
  );
  const insets = insetsFor(position, offset);

  useEffect(() => {
    setPosition(positionProp);
  }, [positionProp]);

  useEffect(() => {
    setItemsDirection(itemsDirectionProp);
  }, [itemsDirectionProp]);

  const changePosition = useCallback((next: TFloatingActionsPosition) => {
    setPosition(next);
  }, []);

  const changeItemsDirection = useCallback(
    (next: TFloatingActionsItemsDirection) => {
      setItemsDirection(next);
    },
    [],
  );

  const value = useMemo(
    () => ({
      slot,
      position,
      itemsDirection,
      naturalItemsDirection,
      changePosition,
      changeItemsDirection,
    }),
    [changeItemsDirection, changePosition, itemsDirection, naturalItemsDirection, position, slot],
  );

  return (
    <FloatingActionsContext.Provider value={value}>
      {children}
      <SFloatingActionsSlot
        ref={setSlot}
        flexDirection={layout.flexDirection}
        {...insets}
      />
    </FloatingActionsContext.Provider>
  );
};

export { FloatingActionsProvider };
export default FloatingActionsProvider;
export type {
  TFloatingActionsProviderProps,
  TFloatingActionsPosition,
  TFloatingActionsItemsDirection,
  TFloatingActionsInset,
} from './types';
export type { TFloatingActionsContextValue } from './context';
