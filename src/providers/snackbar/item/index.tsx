import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SSnackbarItem } from './styles';
import { TSnackbarItemProps } from './types';

const SnackbarItem = forwardRef<HTMLDivElement, TSnackbarItemProps>(
  (
    {
      item,
      position,
      render,
      stretch,
      stacked = false,
      expanded = false,
      stackIndex = 0,
      onClose,
      onExited,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const exitedRef = useRef(false);

    useLayoutEffect(() => {
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          setOpen(true);
        });
      });

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, []);

    useEffect(() => {
      if (item.exiting) {
        setOpen(false);
      }
    }, [item.exiting]);

    return (
      <SSnackbarItem
        ref={ref}
        position={position}
        open={open}
        stretch={stretch}
        stacked={stacked}
        expanded={expanded}
        stackIndex={stackIndex}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) {
            return;
          }

          if (event.propertyName !== 'opacity') {
            return;
          }

          if (item.exiting && !open && !exitedRef.current) {
            exitedRef.current = true;
            onExited(item.id);
          }
        }}
      >
        {render({
          id: item.id,
          title: item.title,
          description: item.description,
          color: item.color,
          variant: item.variant,
          size: item.size,
          icon: item.icon,
          onClose: () => onClose(item.id),
        })}
      </SSnackbarItem>
    );
  },
);

SnackbarItem.displayName = 'SnackbarItem';

export default SnackbarItem;
