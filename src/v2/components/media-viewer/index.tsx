import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Portal } from '../../../components/portal';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowRightIcon, CloseIcon, PlayIcon } from '../../../icons';
import { Backdrop } from '../backdrop';
import { IconButton } from '../icon-button';
import { Text } from '../text';
import { mediaViewerClasses } from './classes';
import {
  SMediaViewerCaption,
  SMediaViewerClose,
  SMediaViewerFrame,
  SMediaViewerGallery,
  SMediaViewerImage,
  SMediaViewerMedia,
  SMediaViewerNav,
  SMediaViewerRoot,
  SMediaViewerStage,
  SMediaViewerThumb,
  SMediaViewerThumbPlay,
  SMediaViewerTrack,
  SMediaViewerVideo,
} from './styles';
import { TMediaViewerItem, TMediaViewerProps, TMediaViewerType } from './types';

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

    useEffect(() => {
      if (!open || !canBrowse) {
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
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [canBrowse, open, step]);

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

    if (!open || active == null) {
      return null;
    }

    const activeType = mediaType(active);
    const activeLabel = active.alt || 'Media viewer';

    return (
      <Portal>
        <Backdrop padding lockScroll align="stretch" onClose={close}>
          <SMediaViewerRoot
            ref={ref}
            {...props}
            className={mergeClasses(
              mediaViewerClasses.root,
              mediaViewerClasses.open,
              className,
            )}
          >
            <SMediaViewerClose className={mediaViewerClasses.close}>
              <IconButton
                variant="solid"
                appearance="opaque"
                color="base"
                size="md"
                radius="pill"
                aria-label="Close viewer"
                onClick={close}
              >
                <CloseIcon />
              </IconButton>
            </SMediaViewerClose>
            <SMediaViewerStage className={mediaViewerClasses.stage}>
              {canBrowse ? (
                <SMediaViewerNav
                  side="start"
                  className={mergeClasses(
                    mediaViewerClasses.nav,
                    mediaViewerClasses.navStart,
                  )}
                >
                  <IconButton
                    variant="solid"
                    appearance="opaque"
                    color="base"
                    size="lg"
                    radius="pill"
                    aria-label="Previous"
                    onClick={() => step(-1)}
                  >
                    <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />
                  </IconButton>
                </SMediaViewerNav>
              ) : null}
              <SMediaViewerFrame
                role="dialog"
                aria-modal="true"
                aria-label={activeLabel}
                className={mediaViewerClasses.frame}
              >
                <SMediaViewerMedia className={mediaViewerClasses.media}>
                  {activeType === 'video' ? (
                    <SMediaViewerVideo
                      key={`${active.src}-${index}`}
                      src={active.src}
                      poster={active.thumbnail || undefined}
                      controls
                      playsInline
                      preload="metadata"
                      className={mediaViewerClasses.video}
                      {...videoProps}
                      onLoadedMetadata={(event) => {
                        showVideoFrame(event.currentTarget);
                        videoProps?.onLoadedMetadata?.(event);
                      }}
                    />
                  ) : (
                    <SMediaViewerImage
                      key={`${active.src}-${index}`}
                      src={active.src}
                      alt={active.alt ?? ''}
                      className={mediaViewerClasses.image}
                      {...imgProps}
                    />
                  )}
                </SMediaViewerMedia>
                {active.caption != null ? (
                  <SMediaViewerCaption className={mediaViewerClasses.caption}>
                    {typeof active.caption === 'string' ? (
                      <Text size="sm">{active.caption}</Text>
                    ) : (
                      active.caption
                    )}
                  </SMediaViewerCaption>
                ) : null}
              </SMediaViewerFrame>
              {canBrowse ? (
                <SMediaViewerNav
                  side="end"
                  className={mergeClasses(
                    mediaViewerClasses.nav,
                    mediaViewerClasses.navEnd,
                  )}
                >
                  <IconButton
                    variant="solid"
                    appearance="opaque"
                    color="base"
                    size="lg"
                    radius="pill"
                    aria-label="Next"
                    onClick={() => step(1)}
                  >
                    <ArrowRightIcon />
                  </IconButton>
                </SMediaViewerNav>
              ) : null}
            </SMediaViewerStage>
            {canBrowse ? (
              <SMediaViewerGallery
                ref={setGalleryEl}
                className={mediaViewerClasses.gallery}
              >
                <SMediaViewerTrack
                  ref={setTrackEl}
                  offset={galleryOffset}
                  ready={galleryReady}
                  className={mediaViewerClasses.track}
                >
                  {items.map((item, itemIndex) => {
                    const selected = itemIndex === index;
                    const isVideo = mediaType(item) === 'video';

                    return (
                      <SMediaViewerThumb
                        key={`${item.src}-${itemIndex}`}
                        type="button"
                        selected={selected}
                        aria-current={selected ? 'true' : undefined}
                        aria-label={item.alt || `Item ${itemIndex + 1}`}
                        className={mergeClasses(
                          mediaViewerClasses.thumb,
                          selected && mediaViewerClasses.selected,
                        )}
                        onClick={() => setIndex(itemIndex)}
                      >
                        {isVideo ? (
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
                        {isVideo ? (
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
  TMediaViewerType,
} from './types';
export { mediaViewerClasses } from './classes';
export { MediaViewer };
export default MediaViewer;
