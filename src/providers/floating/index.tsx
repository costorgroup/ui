import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FloatingContext } from './context';
import { floatingLayout, naturalItemsDirectionFor } from './data';
import { SFloatingSlot } from './styles';
import {
  TFloatingItemsDirection,
  TFloatingPosition,
  TFloatingProviderProps,
} from './types';

const insetsFor = (
  position: TFloatingPosition,
  offset: TFloatingProviderProps['offset'],
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

const FloatingProvider = ({
  children,
  position: positionProp = 'bottom-right',
  itemsDirection: itemsDirectionProp = 'vertical',
  offset = 'md',
}: TFloatingProviderProps) => {
  const [slot, setSlot] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(positionProp);
  const [itemsDirection, setItemsDirection] = useState(itemsDirectionProp);
  const layout = floatingLayout[position][itemsDirection];
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

  const changePosition = useCallback((next: TFloatingPosition) => {
    setPosition(next);
  }, []);

  const changeItemsDirection = useCallback(
    (next: TFloatingItemsDirection) => {
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
    [
      changeItemsDirection,
      changePosition,
      itemsDirection,
      naturalItemsDirection,
      position,
      slot,
    ],
  );

  return (
    <FloatingContext.Provider value={value}>
      {children}
      <SFloatingSlot
        ref={setSlot}
        flexDirection={layout.flexDirection}
        {...insets}
      />
    </FloatingContext.Provider>
  );
};

export { FloatingProvider };
export default FloatingProvider;
export type {
  TFloatingProviderProps,
  TFloatingPosition,
  TFloatingItemsDirection,
  TFloatingNaturalDirection,
  TFloatingInset,
} from './types';
export type { TFloatingContextValue } from './context';
