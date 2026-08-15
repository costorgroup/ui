import React, {
  KeyboardEvent,
  PointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import {
  FullscreenExitIcon,
  FullscreenIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
  VolumeOffIcon,
} from '../../icons';
import { IconButton } from '../icon-button';
import { videoClasses } from './classes';
import { SVideo } from './styles';
import { TVideoProps } from './types';

const HIDE_MS = 3000;
const SEEK_STEP = 5;

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00';
  }

  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const ratioFromPointer = (event: PointerEvent<HTMLElement>, max: number) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const ratio = rect.width === 0 ? 0 : (event.clientX - rect.left) / rect.width;

  return Math.min(max, Math.max(0, ratio * max));
};

const getFullscreenElement = () =>
  document.fullscreenElement ??
  (document as Document & { webkitFullscreenElement?: Element })
    .webkitFullscreenElement ??
  null;

const requestFullscreen = (node: HTMLElement) => {
  const request =
    node.requestFullscreen ??
    (node as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void })
      .webkitRequestFullscreen;

  return request?.call(node);
};

const exitFullscreen = () => {
  const exit =
    document.exitFullscreen ??
    (document as Document & { webkitExitFullscreen?: () => Promise<void> | void })
      .webkitExitFullscreen;

  return exit?.call(document);
};

const Video = forwardRef<HTMLVideoElement, TVideoProps>(
  (
    {
      className,
      width,
      height,
      radius = 'medium',
      color = 'primary',
      controls = true,
      autoHide = true,
      onClick,
      onDoubleClick,
      onPlay,
      onPause,
      onTimeUpdate,
      onVolumeChange,
      onLoadedMetadata,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined,
    );
    const lastVolume = useRef(1);

    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(Boolean(props.muted));
    const [fullscreen, setFullscreen] = useState(false);
    const [idle, setIdle] = useState(false);
    const [controlsHover, setControlsHover] = useState(false);

    const setVideoRef = useCallback(
      (node: HTMLVideoElement | null) => {
        videoRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const showControls = useCallback(() => {
      setIdle(false);
      window.clearTimeout(hideTimer.current);

      if (!autoHide || videoRef.current?.paused || controlsHover) {
        return;
      }

      hideTimer.current = setTimeout(() => {
        setIdle(true);
      }, HIDE_MS);
    }, [autoHide, controlsHover]);

    const togglePlay = useCallback(() => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      if (video.paused) {
        void video.play();
      } else {
        video.pause();
      }
    }, []);

    const toggleMute = useCallback(() => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      if (video.muted || video.volume === 0) {
        video.muted = false;
        video.volume = lastVolume.current || 1;
      } else {
        lastVolume.current = video.volume || lastVolume.current;
        video.muted = true;
      }
    }, []);

    const toggleFullscreen = useCallback(() => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      if (getFullscreenElement() === root) {
        void exitFullscreen();
      } else {
        void requestFullscreen(root);
      }
    }, []);

    useEffect(() => {
      const onChange = () => {
        setFullscreen(getFullscreenElement() === rootRef.current);
      };

      document.addEventListener('fullscreenchange', onChange);
      document.addEventListener('webkitfullscreenchange', onChange);

      return () => {
        document.removeEventListener('fullscreenchange', onChange);
        document.removeEventListener('webkitfullscreenchange', onChange);
        window.clearTimeout(hideTimer.current);
      };
    }, []);

    useEffect(() => {
      if (paused || !autoHide) {
        window.clearTimeout(hideTimer.current);
        setIdle(false);
        return;
      }

      if (controlsHover) {
        window.clearTimeout(hideTimer.current);
        setIdle(false);
        return;
      }

      showControls();
    }, [autoHide, controlsHover, paused, showControls]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const video = videoRef.current;

      if (!video || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      showControls();

      switch (event.key) {
        case ' ':
        case 'k':
        case 'K':
          event.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          event.preventDefault();
          video.currentTime = Math.min(video.duration || 0, video.currentTime + SEEK_STEP);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - SEEK_STEP);
          break;
        case 'ArrowUp':
          event.preventDefault();
          video.muted = false;
          video.volume = Math.min(1, video.volume + 0.05);
          break;
        case 'ArrowDown':
          event.preventDefault();
          video.volume = Math.max(0, video.volume - 0.05);
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          toggleFullscreen();
          break;
        case 'Home':
          event.preventDefault();
          video.currentTime = 0;
          break;
        case 'End':
          event.preventDefault();
          video.currentTime = video.duration || 0;
          break;
        default:
          break;
      }
    };

    const controlsHidden = Boolean(
      controls && autoHide && idle && !paused && !controlsHover,
    );
    const playedRatio = duration > 0 ? currentTime / duration : 0;
    const volumeRatio = muted ? 0 : volume;

    return (
      <SVideo
        ref={rootRef}
        width={width}
        height={height}
        radius={radius}
        color={color}
        tabIndex={0}
        data-paused={paused ? 'true' : undefined}
        data-idle={controlsHidden ? 'true' : undefined}
        className={mergeClasses(videoClasses.root, className)}
        onMouseMove={showControls}
        onMouseLeave={() => {
          setControlsHover(false);
          if (autoHide && !videoRef.current?.paused) {
            setIdle(true);
            window.clearTimeout(hideTimer.current);
          }
        }}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          if (event.target === videoRef.current || event.currentTarget === event.target) {
            togglePlay();
          }
        }}
        onDoubleClick={(event) => {
          if (event.target === videoRef.current) {
            toggleFullscreen();
          }
        }}
      >
        <video
          {...props}
          ref={setVideoRef}
          className={videoClasses.media}
          playsInline
          onClick={(event) => {
            event.stopPropagation();
            togglePlay();
            onClick?.(event);
          }}
          onDoubleClick={(event) => {
            event.stopPropagation();
            toggleFullscreen();
            onDoubleClick?.(event);
          }}
          onPlay={(event) => {
            setPaused(false);
            showControls();
            onPlay?.(event);
          }}
          onPause={(event) => {
            setPaused(true);
            setIdle(false);
            onPause?.(event);
          }}
          onTimeUpdate={(event) => {
            setCurrentTime(event.currentTarget.currentTime);
            onTimeUpdate?.(event);
          }}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            setVolume(event.currentTarget.volume);
            setMuted(event.currentTarget.muted);
            lastVolume.current = event.currentTarget.volume || 1;
            onLoadedMetadata?.(event);
          }}
          onVolumeChange={(event) => {
            setVolume(event.currentTarget.volume);
            setMuted(event.currentTarget.muted);
            if (!event.currentTarget.muted && event.currentTarget.volume > 0) {
              lastVolume.current = event.currentTarget.volume;
            }
            onVolumeChange?.(event);
          }}
        />
        {controls ? (
          <>
            <div className={videoClasses.overlay} aria-hidden={!paused}>
              <IconButton
                type="button"
                size="lg"
                color="light"
                variant="solid"
                rounded
                tabIndex={-1}
                aria-label={paused ? 'Play' : 'Pause'}
                style={{ pointerEvents: paused ? 'auto' : 'none' }}
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlay();
                }}
              >
                <PlayIcon />
              </IconButton>
            </div>
            <div
              className={videoClasses.controls}
              onMouseEnter={() => setControlsHover(true)}
              onMouseLeave={() => setControlsHover(false)}
              onClick={(event) => event.stopPropagation()}
              onDoubleClick={(event) => event.stopPropagation()}
            >
              <div
                className={videoClasses.progress}
                role="slider"
                tabIndex={0}
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={currentTime}
                aria-valuetext={formatTime(currentTime)}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  const video = videoRef.current;

                  if (video) {
                    video.currentTime = ratioFromPointer(event, duration);
                  }
                }}
                onPointerMove={(event) => {
                  if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                    return;
                  }

                  const video = videoRef.current;

                  if (video) {
                    video.currentTime = ratioFromPointer(event, duration);
                  }
                }}
              >
                <span
                  className={videoClasses.played}
                  style={{ width: `${playedRatio * 100}%` }}
                />
              </div>
              <div className={videoClasses.bar}>
                <IconButton
                  type="button"
                  size="sm"
                  color="light"
                  variant="ghost"
                  rounded
                  aria-label={paused ? 'Play' : 'Pause'}
                  onClick={togglePlay}
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                </IconButton>
                <span className={videoClasses.time}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className={videoClasses.volume}>
                  <IconButton
                    type="button"
                    size="sm"
                    color="light"
                    variant="ghost"
                    rounded
                    aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
                    onClick={toggleMute}
                  >
                    {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeIcon />}
                  </IconButton>
                  <div
                    className={videoClasses.volumeTrack}
                    role="slider"
                    tabIndex={0}
                    aria-label="Volume"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={volumeRatio}
                    onPointerDown={(event) => {
                      event.currentTarget.setPointerCapture(event.pointerId);
                      const video = videoRef.current;

                      if (!video) {
                        return;
                      }

                      const next = ratioFromPointer(event, 1);
                      video.muted = next === 0;
                      video.volume = next;
                    }}
                    onPointerMove={(event) => {
                      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                        return;
                      }

                      const video = videoRef.current;

                      if (!video) {
                        return;
                      }

                      const next = ratioFromPointer(event, 1);
                      video.muted = next === 0;
                      video.volume = next;
                    }}
                  >
                    <span
                      className={videoClasses.volumeFill}
                      style={{ width: `${volumeRatio * 100}%` }}
                    />
                  </div>
                </div>
                <IconButton
                  type="button"
                  size="sm"
                  color="light"
                  variant="ghost"
                  rounded
                  aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  onClick={toggleFullscreen}
                >
                  {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </div>
            </div>
          </>
        ) : null}
      </SVideo>
    );
  },
);

Video.displayName = 'Video';

export type { TVideoProps, TVideoRadius } from './types';
export { videoClasses } from './classes';
export { Video };
export default Video;
