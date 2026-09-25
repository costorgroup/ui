import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Portal } from '../portal';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import {
  ArrowRightIcon,
  CloseIcon,
  DownloadIcon,
  MirrorHorizontalIcon,
  MirrorVerticalIcon,
  PauseIcon,
  PlayIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '../../icons';
import { Backdrop } from '../backdrop';
import { Dock, DockItem, DockSeparator } from '../dock';
import { Text } from '../text';
import { mediaViewerClasses } from './classes';
import {
  SMediaViewerCaption,
  SMediaViewerChrome,
  SMediaViewerFrame,
  SMediaViewerGallery,
  SMediaViewerImage,
  SMediaViewerMedia,
  SMediaViewerPan,
  SMediaViewerReveal,
  SMediaViewerRoot,
  SMediaViewerStage,
  SMediaViewerThumb,
  SMediaViewerThumbPlay,
  SMediaViewerTrack,
  SMediaViewerTransform,
  SMediaViewerVideo,
} from './styles';
import { TMediaViewerItem, TMediaViewerProps, TMediaViewerType } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

const TOOL_ITEM = {
  radius: 'full',
  color: 'inverted',
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const rotatedBounds = (width: number, height: number, rotate: number) => {
  const turns = ((rotate % 360) + 360) % 360;
  const swapped = turns === 90 || turns === 270;

  return swapped
    ? { width: height, height: width }
    : { width, height };
};

const clampPan = (
  x: number,
  y: number,
  visualWidth: number,
  visualHeight: number,
  viewWidth: number,
  viewHeight: number,
) => {
  const maxX = Math.max(0, (visualWidth - viewWidth) / 2);
  const maxY = Math.max(0, (visualHeight - viewHeight) / 2);

  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  };
};

const clampIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
};

const wrapIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
};

const mediaType = (item: TMediaViewerItem): TMediaViewerType =>
  item.type === 'video' ? 'video' : 'image';

const showVideoFrame = (video: HTMLVideoElement) => {
  if (video.currentTime === 0 && video.duration > 0) {
    video.currentTime = Math.min(0.1, video.duration / 4);
  }
};

const fileNameFromSrc = (src: string) => {
  try {
    const path = new URL(src, window.location.href).pathname;
    const name = path.split('/').pop();

    if (name) {
      return decodeURIComponent(name);
    }
  } catch {
    /* ignore */
  }

  return 'download';
};

const downloadSrc = async (src: string) => {
  const name = fileNameFromSrc(src);

  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = name;
    link.click();
    URL.revokeObjectURL(href);
  } catch {
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }
};

const MediaViewer = forwardRef<HTMLDivElement, TMediaViewerProps>(
  (
    {
      items = [],
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      imgProps,
      videoProps,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const canBrowse = items.length > 1;
    const isOpenControlled = openProp !== undefined;
    const isIndexControlled = indexProp !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [uncontrolledIndex, setUncontrolledIndex] = useState(() =>
      clampIndex(defaultIndex, items.length),
    );
    const open = isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
    const index = clampIndex(
      isIndexControlled ? Number(indexProp) : uncontrolledIndex,
      items.length,
    );
    const active = items[index];
    const [galleryEl, setGalleryEl] = useState<HTMLDivElement | null>(null);
    const [trackEl, setTrackEl] = useState<HTMLDivElement | null>(null);
    const [galleryOffset, setGalleryOffset] = useState(0);
    const [galleryReady, setGalleryReady] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [mirrorX, setMirrorX] = useState(false);
    const [mirrorY, setMirrorY] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const [natural, setNatural] = useState({ width: 0, height: 0 });
    const [dragging, setDragging] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const chromeRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<{
      pointerId: number;
      startX: number;
      startY: number;
      panX: number;
      panY: number;
    } | null>(null);
    const panNodeRef = useRef<HTMLDivElement | null>(null);

    const stopDrag = useCallback((pointerId?: number) => {
      const drag = dragRef.current;

      if (drag == null) {
        return;
      }

      if (pointerId != null && drag.pointerId !== pointerId) {
        return;
      }

      dragRef.current = null;
      setDragging(false);

      const node = panNodeRef.current;

      if (node != null && node.hasPointerCapture(drag.pointerId)) {
        node.releasePointerCapture(drag.pointerId);
      }
    }, []);

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) {
          setUncontrolledOpen(next);
        }

        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange],
    );

    const setIndex = useCallback(
      (next: number) => {
        const safe = clampIndex(next, items.length);

        if (!isIndexControlled) {
          setUncontrolledIndex(safe);
        }

        onIndexChange?.(safe);
      },
      [isIndexControlled, items.length, onIndexChange],
    );

    const close = useCallback(() => setOpen(false), [setOpen]);

    const step = useCallback(
      (delta: number) => {
        if (!canBrowse) {
          return;
        }

        const next = wrapIndex(index + delta, items.length);

        if (!isIndexControlled) {
          setUncontrolledIndex(next);
        }

        onIndexChange?.(next);
      },
      [canBrowse, index, isIndexControlled, items.length, onIndexChange],
    );

    const resetView = useCallback(() => {
      setZoom(1);
      setRotate(0);
      setMirrorX(false);
      setMirrorY(false);
      setPlaying(false);
      setPan({ x: 0, y: 0 });
    }, []);

    const nudgeZoom = useCallback((delta: number) => {
      setZoom((current) =>
        Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, current + delta)),
      );
    }, []);

    const captureNatural = useCallback(
      (node: HTMLImageElement | HTMLVideoElement | null) => {
        if (node == null) {
          return;
        }

        const width =
          node instanceof HTMLVideoElement
            ? node.videoWidth
            : node.naturalWidth;
        const height =
          node instanceof HTMLVideoElement
            ? node.videoHeight
            : node.naturalHeight;

        if (width <= 0 || height <= 0) {
          return;
        }

        setNatural((current) =>
          current.width === width && current.height === height
            ? current
            : { width, height },
        );
      },
      [],
    );

    useLayoutEffect(() => {
      const node = viewportRef.current;

      if (node == null || !open) {
        return;
      }

      const update = () => {
        setViewport((current) => {
          const width = node.clientWidth;
          const height = node.clientHeight;

          if (current.width === width && current.height === height) {
            return current;
          }

          return { width, height };
        });
      };

      update();
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        update();
        inner = requestAnimationFrame(update);
      });
      const observer = new ResizeObserver(update);
      observer.observe(node);

      if (chromeRef.current != null) {
        observer.observe(chromeRef.current);
      }

      let ancestor = node.parentElement;
      for (let i = 0; i < 3 && ancestor != null; i += 1) {
        observer.observe(ancestor);
        ancestor = ancestor.parentElement;
      }

      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
        observer.disconnect();
      };
    }, [galleryReady, index, open]);

    useLayoutEffect(() => {
      if (!open) {
        return;
      }

      resetView();
    }, [index, open, resetView]);

    useLayoutEffect(() => {
      if (!open) {
        return;
      }

      const node = imageRef.current ?? videoRef.current;
      const loaded =
        node instanceof HTMLImageElement
          ? node.complete && node.naturalWidth > 0
          : node instanceof HTMLVideoElement
            ? node.readyState >= HTMLMediaElement.HAVE_METADATA &&
              node.videoWidth > 0
            : false;

      if (loaded) {
        captureNatural(node);
        return;
      }

      setNatural({ width: 0, height: 0 });
    }, [active?.src, captureNatural, index, open]);

    const togglePlay = useCallback(() => {
      const video = videoRef.current;

      if (video == null) {
        return;
      }

      if (video.paused) {
        void video.play();
        return;
      }

      video.pause();
    }, []);

    useEffect(() => {
      if (!open) {
        return;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          step(1);
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          step(-1);
        }

        if (event.key === ' ' || event.key === 'Spacebar') {
          if (active != null && mediaType(active) === 'video') {
            event.preventDefault();
            togglePlay();
          }
        }

        if (event.key === '+' || event.key === '=') {
          event.preventDefault();
          nudgeZoom(ZOOM_STEP);
        }

        if (event.key === '-' || event.key === '_') {
          event.preventDefault();
          nudgeZoom(-ZOOM_STEP);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [active, nudgeZoom, open, step, togglePlay]);

    const centerGallery = useCallback(() => {
      if (galleryEl == null || trackEl == null) {
        return false;
      }

      const thumb = trackEl.children[index] as HTMLElement | undefined;

      if (thumb == null || thumb.offsetWidth === 0) {
        return false;
      }

      setGalleryOffset(
        galleryEl.clientWidth / 2 - (thumb.offsetLeft + thumb.offsetWidth / 2),
      );
      setGalleryReady(true);
      return true;
    }, [galleryEl, index, trackEl]);

    useLayoutEffect(() => {
      if (!open) {
        setGalleryReady(false);
        setGalleryOffset(0);
        return;
      }

      centerGallery();
    }, [centerGallery, open]);

    useEffect(() => {
      if (!open || !canBrowse || galleryEl == null || trackEl == null) {
        return;
      }

      const update = () => {
        centerGallery();
      };

      const observer = new ResizeObserver(update);
      observer.observe(galleryEl);
      observer.observe(trackEl);

      const media = trackEl.querySelectorAll('img, video');
      media.forEach((node) => {
        node.addEventListener('load', update);
        node.addEventListener('loadeddata', update);
        node.addEventListener('seeked', update);
      });

      return () => {
        observer.disconnect();
        media.forEach((node) => {
          node.removeEventListener('load', update);
          node.removeEventListener('loadeddata', update);
          node.removeEventListener('seeked', update);
        });
      };
    }, [canBrowse, centerGallery, galleryEl, open, trackEl]);

    const bounds = rotatedBounds(natural.width, natural.height, rotate);
    const fit =
      bounds.width > 0 &&
      bounds.height > 0 &&
      viewport.width > 0 &&
      viewport.height > 0
        ? Math.min(
            1,
            viewport.width / bounds.width,
            viewport.height / bounds.height,
          )
        : 0;
    const scale = fit * zoom;
    const mediaWidth = natural.width * scale;
    const mediaHeight = natural.height * scale;
    const visualWidth = bounds.width * scale;
    const visualHeight = bounds.height * scale;
    const canPan =
      visualWidth > viewport.width + 0.5 ||
      visualHeight > viewport.height + 0.5;
    const mediaReady =
      mediaWidth > 0 && mediaHeight > 0 && visualWidth > 0 && visualHeight > 0;

    useLayoutEffect(() => {
      setPan((current) => {
        const next = clampPan(
          current.x,
          current.y,
          visualWidth,
          visualHeight,
          viewport.width,
          viewport.height,
        );

        if (next.x === current.x && next.y === current.y) {
          return current;
        }

        return next;
      });
    }, [visualWidth, visualHeight, viewport.height, viewport.width]);

    useEffect(() => {
      if (!dragging) {
        return;
      }

      const onPointerUp = (event: PointerEvent) => {
        stopDrag(event.pointerId);
      };

      const onMouseUp = () => {
        stopDrag();
      };

      window.addEventListener('pointerup', onPointerUp, true);
      window.addEventListener('pointercancel', onPointerUp, true);
      window.addEventListener('mouseup', onMouseUp, true);
      window.addEventListener('blur', onMouseUp);
      document.addEventListener('visibilitychange', onMouseUp);

      return () => {
        window.removeEventListener('pointerup', onPointerUp, true);
        window.removeEventListener('pointercancel', onPointerUp, true);
        window.removeEventListener('mouseup', onMouseUp, true);
        window.removeEventListener('blur', onMouseUp);
        document.removeEventListener('visibilitychange', onMouseUp);
      };
    }, [dragging, stopDrag]);

    if (!open || active == null) {
      return null;
    }

    const activeType = mediaType(active);
    const isVideo = activeType === 'video';
    const activeLabel = active.alt || 'Media viewer';
    const mediaTransform = mediaReady
      ? `translate(-50%, -50%) rotate(${rotate}deg) scale(${mirrorX ? -1 : 1}, ${mirrorY ? -1 : 1})`
      : `rotate(${rotate}deg) scale(${zoom * (mirrorX ? -1 : 1)}, ${zoom * (mirrorY ? -1 : 1)})`;
    const panTransform = `translate(${pan.x}px, ${pan.y}px)`;

    return (
      <Portal>
        <Backdrop
          {...mergeSlotProps(
            {
              padding: true,
              lockScroll: true,
              align: 'stretch',
              onClose: close,
            },
            slotProps?.backdrop,
          )}
        >
          <SMediaViewerRoot
            ref={ref}
            {...props}
            className={mergeClasses(
              mediaViewerClasses.root,
              mediaViewerClasses.open,
              className,
            )}
          >
            <SMediaViewerStage
              {...mergeSlotProps(
                {
                  className: mediaViewerClasses.stage,
                },
                slotProps?.stage,
              )}
            >
              <SMediaViewerFrame
                {...mergeSlotProps(
                  {
                    role: 'dialog',
                    'aria-modal': 'true',
                    'aria-label': activeLabel,
                    className: mediaViewerClasses.frame,
                  },
                  slotProps?.frame,
                )}
              >
                <SMediaViewerMedia
                  ref={viewportRef}
                  className={mediaViewerClasses.media}
                >
                  <SMediaViewerPan
                    canPan={canPan}
                    grabbing={dragging}
                    animated={mediaReady && !dragging}
                    style={
                      mediaReady
                        ? {
                            width: visualWidth,
                            height: visualHeight,
                            transform: panTransform,
                          }
                        : {
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                    }
                    onPointerDown={(event) => {
                      if (!canPan || event.button !== 0) {
                        return;
                      }

                      event.preventDefault();
                      panNodeRef.current = event.currentTarget;
                      event.currentTarget.setPointerCapture(event.pointerId);
                      dragRef.current = {
                        pointerId: event.pointerId,
                        startX: event.clientX,
                        startY: event.clientY,
                        panX: pan.x,
                        panY: pan.y,
                      };
                      setDragging(true);
                    }}
                    onPointerMove={(event) => {
                      const drag = dragRef.current;

                      if (drag == null || drag.pointerId !== event.pointerId) {
                        return;
                      }

                      setPan(
                        clampPan(
                          drag.panX + event.clientX - drag.startX,
                          drag.panY + event.clientY - drag.startY,
                          visualWidth,
                          visualHeight,
                          viewport.width,
                          viewport.height,
                        ),
                      );
                    }}
                    onPointerUp={(event) => stopDrag(event.pointerId)}
                    onPointerCancel={(event) => stopDrag(event.pointerId)}
                    onLostPointerCapture={() => stopDrag()}
                  >
                    <SMediaViewerReveal key={`${active.src}-${index}`}>
                    <SMediaViewerTransform
                      style={
                        mediaReady
                          ? {
                              width: mediaWidth,
                              height: mediaHeight,
                              transform: mediaTransform,
                            }
                          : {
                              position: 'relative',
                              top: 'auto',
                              left: 'auto',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transform: mediaTransform,
                            }
                      }
                    >
                      {isVideo ? (
                        <SMediaViewerVideo
                          key={`${active.src}-${index}`}
                          {...mergeSlotProps(
                            {
                              src: active.src,
                              poster: active.thumbnail || undefined,
                              playsInline: true,
                              preload: 'metadata',
                              ready: mediaReady,
                              className: mediaViewerClasses.video,
                              ...videoProps,
                              ref: videoRef,
                              onPlay: (event) => {
                                setPlaying(true);
                                videoProps?.onPlay?.(event);
                              },
                              onPause: (event) => {
                                setPlaying(false);
                                videoProps?.onPause?.(event);
                              },
                              onEnded: (event) => {
                                setPlaying(false);
                                videoProps?.onEnded?.(event);
                              },
                              onLoadedMetadata: (event) => {
                                captureNatural(event.currentTarget);
                                showVideoFrame(event.currentTarget);
                                videoProps?.onLoadedMetadata?.(event);
                              },
                            },
                            slotProps?.video,
                          )}
                        />
                      ) : (
                        <SMediaViewerImage
                          key={`${active.src}-${index}`}
                          {...mergeSlotProps(
                            {
                              src: active.src,
                              alt: active.alt ?? '',
                              ready: mediaReady,
                              className: mediaViewerClasses.image,
                              ...imgProps,
                              ref: imageRef,
                              onLoad: (event) => {
                                captureNatural(event.currentTarget);
                                imgProps?.onLoad?.(event);
                              },
                            },
                            slotProps?.image,
                          )}
                        />
                      )}
                    </SMediaViewerTransform>
                    </SMediaViewerReveal>
                  </SMediaViewerPan>
                </SMediaViewerMedia>
              </SMediaViewerFrame>
            </SMediaViewerStage>
            <SMediaViewerChrome
              {...mergeSlotProps(
                {
                  ref: chromeRef,
                  className: mediaViewerClasses.chrome,
                },
                slotProps?.chrome,
              )}
            >
              {active.caption != null ? (
                <SMediaViewerCaption
                  {...mergeSlotProps(
                    {
                      className: mediaViewerClasses.caption,
                    },
                    slotProps?.caption,
                  )}
                >
                    {typeof active.caption === 'string' ? (
                      <Text size="sm">{active.caption}</Text>
                    ) : (
                      active.caption
                    )}
                </SMediaViewerCaption>
              ) : active.alt ? (
                <SMediaViewerCaption
                  {...mergeSlotProps(
                    {
                      className: mediaViewerClasses.caption,
                    },
                    slotProps?.caption,
                  )}
                >
                  <Text size="sm">{active.alt}</Text>
                </SMediaViewerCaption>
              ) : null}
              {canBrowse ? (
                <SMediaViewerGallery
                  {...mergeSlotProps(
                    {
                      ref: setGalleryEl,
                      className: mediaViewerClasses.gallery,
                    },
                    slotProps?.gallery,
                  )}
                >
                  <SMediaViewerTrack
                    {...mergeSlotProps(
                      {
                        ref: setTrackEl,
                        offset: galleryOffset,
                        ready: galleryReady,
                        className: mediaViewerClasses.track,
                      },
                      slotProps?.track,
                    )}
                  >
                    {items.map((item, itemIndex) => {
                      const selected = itemIndex === index;
                      const thumbIsVideo = mediaType(item) === 'video';

                      return (
                        <SMediaViewerThumb
                          key={`${item.src}-${itemIndex}`}
                          {...mergeSlotProps(
                            {
                              type: 'button',
                              selected,
                              'aria-current': selected ? 'true' : undefined,
                              'aria-label': item.alt || `Item ${itemIndex + 1}`,
                              className: mergeClasses(
                                mediaViewerClasses.thumb,
                                selected && mediaViewerClasses.selected,
                              ),
                              onClick: () => setIndex(itemIndex),
                            },
                            slotProps?.thumb,
                          )}
                        >
                          {thumbIsVideo ? (
                            <video
                              src={item.src}
                              poster={item.thumbnail || undefined}
                              muted
                              playsInline
                              preload="metadata"
                              onLoadedMetadata={(event) => {
                                showVideoFrame(event.currentTarget);
                              }}
                            />
                          ) : (
                            <img src={item.thumbnail} alt="" />
                          )}
                          {thumbIsVideo ? (
                            <SMediaViewerThumbPlay
                              className={mediaViewerClasses.thumbPlay}
                            >
                              <PlayIcon />
                            </SMediaViewerThumbPlay>
                          ) : null}
                        </SMediaViewerThumb>
                      );
                    })}
                  </SMediaViewerTrack>
                </SMediaViewerGallery>
              ) : null}
              <Dock
                {...mergeSlotProps(
                  {
                    size: 'xs',
                    variant: 'surface',
                    appearance: 'opaque',
                    className: mediaViewerClasses.dock,
                  },
                  slotProps?.toolbar,
                )}
              >
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Previous"
                  disabled={!canBrowse}
                  onClick={() => step(-1)}
                >
                  <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label={playing ? 'Pause' : 'Play'}
                  disabled={!isVideo}
                  onClick={togglePlay}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Next"
                  disabled={!canBrowse}
                  onClick={() => step(1)}
                >
                  <ArrowRightIcon />
                </DockItem>
                <DockSeparator />
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Zoom in"
                  disabled={zoom >= ZOOM_MAX}
                  onClick={() => nudgeZoom(ZOOM_STEP)}
                >
                  <ZoomInIcon />
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Zoom out"
                  disabled={zoom <= ZOOM_MIN}
                  onClick={() => nudgeZoom(-ZOOM_STEP)}
                >
                  <ZoomOutIcon />
                </DockItem>
                <DockSeparator />
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Rotate left"
                  onClick={() => setRotate((current) => current - 90)}
                >
                  <RotateLeftIcon />
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Rotate right"
                  onClick={() => setRotate((current) => current + 90)}
                >
                  <RotateRightIcon />
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Mirror vertical"
                  onClick={() => setMirrorY((current) => !current)}
                >
                  <MirrorVerticalIcon />
                </DockItem>
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Mirror horizontal"
                  onClick={() => setMirrorX((current) => !current)}
                >
                  <MirrorHorizontalIcon />
                </DockItem>
                <DockSeparator />
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Download"
                  onClick={() => {
                    void downloadSrc(active.src);
                  }}
                >
                  <DownloadIcon />
                </DockItem>
                <DockSeparator />
                <DockItem
                  {...TOOL_ITEM}
                  aria-label="Close viewer" onClick={close}>
                  <CloseIcon />
                </DockItem>
              </Dock>
            </SMediaViewerChrome>
          </SMediaViewerRoot>
        </Backdrop>
      </Portal>
    );
  },
);

MediaViewer.displayName = 'MediaViewer';

export type {
  TMediaViewerItem,
  TMediaViewerProps,
  TMediaViewerSlotProps,
  TMediaViewerType,
} from './types';
export { mediaViewerClasses } from './classes';
export { MediaViewer };
export default MediaViewer;
