export type TTrackPointerOutsideOptions = {
  /**
   * While true, outside moves are ignored and the listener stays attached.
   * Useful while dragging a scrollbar thumb.
   */
  ignore?: () => boolean;
};

const isPointInsideElement = (
  element: Element,
  clientX: number,
  clientY: number,
) => {
  const rect = element.getBoundingClientRect();

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
};

/**
 * Listens to document `mousemove` until the pointer leaves `element`,
 * then calls `onOutside` and removes the listener.
 */
export const trackPointerOutside = (
  element: Element,
  onOutside: () => void,
  options?: TTrackPointerOutsideOptions,
): (() => void) => {
  const onMove = (event: MouseEvent) => {
    if (isPointInsideElement(element, event.clientX, event.clientY)) {
      return;
    }

    if (options?.ignore?.()) {
      return;
    }

    cleanup();
    onOutside();
  };

  const cleanup = () => {
    document.removeEventListener('mousemove', onMove);
  };

  document.addEventListener('mousemove', onMove);

  return cleanup;
};

export { isPointInsideElement };
