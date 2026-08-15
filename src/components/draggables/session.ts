import { draggableClasses } from '../draggable/classes';
import { draggablesClasses } from './classes';
import { DRAGGABLE_ITEM_ATTR, DRAGGABLES_ATTR } from './context';
import {
  TDraggablesBehaviour,
  TDraggablesLockAxis,
  TDraggablesOrientation,
  TDropResult,
} from './types';

export type TDraggablesHost = {
  id: string;
  node: HTMLDivElement;
  groupName?: string;
  orientation: TDraggablesOrientation;
  behaviour: TDraggablesBehaviour;
  lockAxis?: TDraggablesLockAxis;
  animationDuration: number;
  autoScroll: boolean;
  getChildPayload?: (index: number) => unknown;
  shouldAcceptDrop?: (
    source: { groupName?: string; payload: unknown },
    payload: unknown,
  ) => boolean | undefined;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (result: TDropResult) => void;
  onDragStart?: (payload: unknown) => void;
  onDragEnd?: (payload: unknown) => void;
};

type TDragSession = {
  pointerId: number;
  payload: unknown;
  source: TDraggablesHost;
  sourceIndex: number;
  sourceItem: HTMLElement;
  ghost: HTMLElement;
  placeholder: HTMLElement;
  grabOffsetX: number;
  grabOffsetY: number;
  startX: number;
  startY: number;
  width: number;
  height: number;
  currentHost: TDraggablesHost | null;
  currentIndex: number | null;
  entered: Set<string>;
};

const hosts = new Map<string, TDraggablesHost>();
let session: TDragSession | null = null;

export const registerDraggablesHost = (host: TDraggablesHost) => {
  hosts.set(host.id, host);

  return () => {
    hosts.delete(host.id);
  };
};

const itemSelector = `:scope > [${DRAGGABLE_ITEM_ATTR}="true"]`;

const getItems = (host: TDraggablesHost) =>
  Array.from(host.node.querySelectorAll<HTMLElement>(itemSelector));

const acceptsDrop = (host: TDraggablesHost, source: TDraggablesHost, payload: unknown) => {
  if (source.behaviour === 'contain' && host.id !== source.id) {
    return false;
  }

  if (host.shouldAcceptDrop) {
    const accepted = host.shouldAcceptDrop(
      { groupName: source.groupName, payload },
      payload,
    );

    if (typeof accepted === 'boolean') {
      return accepted;
    }
  }

  if (host.id === source.id) {
    return true;
  }

  return Boolean(host.groupName) && host.groupName === source.groupName;
};

const findHostAtPoint = (x: number, y: number, source: TDraggablesHost, payload: unknown) => {
  const stack = document.elementsFromPoint(x, y);

  for (const element of stack) {
    if (!(element instanceof HTMLElement)) {
      continue;
    }

    const root = element.closest(`[${DRAGGABLES_ATTR}="true"]`);

    if (!(root instanceof HTMLElement)) {
      continue;
    }

    for (const host of hosts.values()) {
      if (host.node === root && acceptsDrop(host, source, payload)) {
        return host;
      }
    }
  }

  return null;
};

const insertIndexAtPoint = (
  host: TDraggablesHost,
  x: number,
  y: number,
  placeholder: HTMLElement,
  sourceItem: HTMLElement,
) => {
  const items = getItems(host).filter(
    (item) => item !== sourceItem && item !== placeholder,
  );
  const position = host.orientation === 'horizontal' ? x : y;

  for (let index = 0; index < items.length; index += 1) {
    const rect = items[index].getBoundingClientRect();
    const middle =
      host.orientation === 'horizontal'
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;

    if (position < middle) {
      return index;
    }
  }

  return items.length;
};

const visibleItems = (host: TDraggablesHost, sourceItem: HTMLElement) =>
  getItems(host).filter(
    (item) =>
      item !== sourceItem && item.style.display !== 'none',
  );

const playFlip = (nodes: HTMLElement[], duration: number) => {
  const origins = nodes.map((node) => node.getBoundingClientRect());

  return () => {
    nodes.forEach((node, index) => {
      const next = node.getBoundingClientRect();
      const dx = origins[index].left - next.left;
      const dy = origins[index].top - next.top;

      if (dx === 0 && dy === 0) {
        return;
      }

      node.style.transition = 'none';
      node.style.transform = `translate(${dx}px, ${dy}px)`;
      node.getBoundingClientRect();
      node.style.transition = `transform ${duration}ms ease`;
      node.style.transform = '';
    });
  };
};

const movePlaceholder = (
  host: TDraggablesHost,
  index: number,
  placeholder: HTMLElement,
  sourceItem: HTMLElement,
) => {
  const items = visibleItems(host, sourceItem);
  const hostsToAnimate = new Set<TDraggablesHost>([host]);

  if (placeholder.parentElement) {
    for (const other of hosts.values()) {
      if (other.node === placeholder.parentElement) {
        hostsToAnimate.add(other);
      }
    }
  }

  const nodes = [...hostsToAnimate].flatMap((item) =>
    getItems(item).filter(
      (node) => node.style.display !== 'none' && node !== sourceItem,
    ),
  );
  const play = playFlip(
    nodes.filter((node, nodeIndex, list) => list.indexOf(node) === nodeIndex),
    host.animationDuration,
  );

  if (index >= items.length) {
    host.node.appendChild(placeholder);
  } else {
    host.node.insertBefore(placeholder, items[index]);
  }

  play();
};

const autoScrollHost = (host: TDraggablesHost, x: number, y: number) => {
  if (!host.autoScroll) {
    return;
  }

  const rect = host.node.getBoundingClientRect();
  const edge = 40;
  const speed = 12;

  if (host.orientation === 'horizontal') {
    if (x < rect.left + edge) {
      host.node.scrollLeft -= speed;
    } else if (x > rect.right - edge) {
      host.node.scrollLeft += speed;
    }
    return;
  }

  if (y < rect.top + edge) {
    host.node.scrollTop -= speed;
  } else if (y > rect.bottom - edge) {
    host.node.scrollTop += speed;
  }
};

const setGhostPosition = (
  ghost: HTMLElement,
  x: number,
  y: number,
  offsetX: number,
  offsetY: number,
  lockAxis: TDraggablesLockAxis | undefined,
  startX: number,
  startY: number,
) => {
  const nextX = lockAxis === 'y' ? startX : x;
  const nextY = lockAxis === 'x' ? startY : y;
  ghost.style.transform = `translate3d(${nextX - offsetX}px, ${nextY - offsetY}px, 0)`;
};

const clearItemShift = (host: TDraggablesHost) => {
  getItems(host).forEach((item) => {
    item.style.transition = '';
    item.style.transform = '';
  });
};

const endDrag = (cancelled = false) => {
  if (!session) {
    return;
  }

  const current = session;
  session = null;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('pointercancel', onPointerUp);

  current.ghost.remove();
  current.placeholder.remove();
  current.sourceItem.style.display = '';
  current.sourceItem.classList.remove(draggableClasses.dragging);
  current.source.node.classList.remove(draggablesClasses.dragging);
  current.currentHost?.node.classList.remove(draggablesClasses.dragging);
  clearItemShift(current.source);

  if (current.currentHost && current.currentHost.id !== current.source.id) {
    clearItemShift(current.currentHost);
  }

  current.source.onDragEnd?.(current.payload);

  if (cancelled) {
    return;
  }

  const sourceIndex = current.sourceIndex;
  const droppedHost = current.currentHost;
  const addedIndex = current.currentIndex;
  const sameHost = droppedHost?.id === current.source.id;
  const copy = current.source.behaviour === 'copy';

  if (!droppedHost || addedIndex === null) {
    return;
  }

  if (sameHost) {
    droppedHost.onDrop?.({
      removedIndex: copy ? null : sourceIndex,
      addedIndex,
      payload: current.payload,
    });
    return;
  }

  if (!copy) {
    current.source.onDrop?.({
      removedIndex: sourceIndex,
      addedIndex: null,
      payload: current.payload,
    });
  }

  droppedHost.onDrop?.({
    removedIndex: null,
    addedIndex,
    payload: current.payload,
  });
};

const onPointerMove = (event: PointerEvent) => {
  if (!session || event.pointerId !== session.pointerId) {
    return;
  }

  event.preventDefault();
  setGhostPosition(
    session.ghost,
    event.clientX,
    event.clientY,
    session.grabOffsetX,
    session.grabOffsetY,
    session.source.lockAxis,
    session.startX,
    session.startY,
  );

  const host = findHostAtPoint(
    event.clientX,
    event.clientY,
    session.source,
    session.payload,
  );

  if (host) {
    autoScrollHost(host, event.clientX, event.clientY);

    if (!session.entered.has(host.id)) {
      session.entered.add(host.id);
      host.onDragEnter?.();
    }

    if (session.currentHost && session.currentHost.id !== host.id) {
      session.currentHost.onDragLeave?.();
      session.currentHost.node.classList.remove(draggablesClasses.dragging);
    }

    const nextIndex = insertIndexAtPoint(
      host,
      event.clientX,
      event.clientY,
      session.placeholder,
      session.sourceItem,
    );

    if (session.currentHost?.id !== host.id || session.currentIndex !== nextIndex) {
      if (
        session.source.behaviour === 'copy' &&
        host.id === session.source.id &&
        nextIndex === session.sourceIndex
      ) {
        session.placeholder.remove();
        session.currentHost = host;
        session.currentIndex = nextIndex;
        return;
      }

      movePlaceholder(
        host,
        nextIndex,
        session.placeholder,
        session.sourceItem,
      );
      host.node.classList.add(draggablesClasses.dragging);
      session.currentHost = host;
      session.currentIndex = nextIndex;
    }

    return;
  }

  if (session.currentHost) {
    session.currentHost.onDragLeave?.();
    session.currentHost.node.classList.remove(draggablesClasses.dragging);
    session.placeholder.remove();
    session.currentHost = null;
    session.currentIndex = null;
  }
};

const onPointerUp = (event: PointerEvent) => {
  if (!session || event.pointerId !== session.pointerId) {
    return;
  }

  endDrag(false);
};

export const startDraggableDrag = ({
  event,
  host,
  item,
}: {
  event: PointerEvent;
  host: TDraggablesHost;
  item: HTMLElement;
}) => {
  if (session) {
    return;
  }

  const items = getItems(host);
  const sourceIndex = items.indexOf(item);

  if (sourceIndex < 0) {
    return;
  }

  const rect = item.getBoundingClientRect();
  const payload = host.getChildPayload?.(sourceIndex);
  const ghost = item.cloneNode(true) as HTMLElement;
  const placeholder = document.createElement('div');

  ghost.classList.add(draggableClasses.ghost);
  ghost.style.position = 'fixed';
  ghost.style.left = '0';
  ghost.style.top = '0';
  ghost.style.margin = '0';
  ghost.style.boxSizing = 'border-box';
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.zIndex = '1500';
  ghost.style.pointerEvents = 'none';
  ghost.style.cursor = 'grabbing';
  ghost.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18)';
  ghost.removeAttribute(DRAGGABLE_ITEM_ATTR);

  placeholder.className = draggablesClasses.placeholder;
  placeholder.style.width = `${rect.width}px`;
  placeholder.style.height = `${rect.height}px`;

  document.body.appendChild(ghost);

  if (host.behaviour !== 'copy') {
    host.node.insertBefore(placeholder, item);
    item.style.display = 'none';
  }

  item.classList.add(draggableClasses.dragging);
  host.node.classList.add(draggablesClasses.dragging);

  session = {
    pointerId: event.pointerId,
    payload,
    source: host,
    sourceIndex,
    sourceItem: item,
    ghost,
    placeholder,
    grabOffsetX: event.clientX - rect.left,
    grabOffsetY: event.clientY - rect.top,
    startX: event.clientX,
    startY: event.clientY,
    width: rect.width,
    height: rect.height,
    currentHost: host,
    currentIndex: sourceIndex,
    entered: new Set([host.id]),
  };

  setGhostPosition(
    ghost,
    event.clientX,
    event.clientY,
    session.grabOffsetX,
    session.grabOffsetY,
    host.lockAxis,
    session.startX,
    session.startY,
  );

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);
  host.onDragStart?.(payload);
  host.onDragEnter?.();
};

export const getDraggablesHost = (id: string) => hosts.get(id);
