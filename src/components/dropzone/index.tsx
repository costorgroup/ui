import React, {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { dropzoneClasses } from './classes';
import { UploadIcon } from '../../icons';
import { Button } from '../button';
import {
  SDropzone,
  SDropzoneActions,
  SDropzoneDescription,
  SDropzoneTitle,
  SDropzoneIcon,
  SDropzoneInput,
  SDropzoneOverlay,
  SDropzonePreview,
} from './styles';
import { TDropzoneProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const EMPTY_FILES: File[] = [];

const toAcceptList = (accept: string | string[] | undefined) =>
  (Array.isArray(accept) ? accept : (accept ?? '').split(','))
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

const matchesAccept = (file: File, accept: string[]) => {
  if (accept.length === 0) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const mime = file.type.toLowerCase();

  return accept.some((token) => {
    if (token.startsWith('.')) {
      return fileName.endsWith(token);
    }

    if (token.endsWith('/*')) {
      return mime.startsWith(token.slice(0, -1));
    }

    return mime === token;
  });
};

// Created inside the effect so StrictMode's cleanup/re-run pair can't leave
// revoked URLs behind.
const useObjectUrls = (files: File[]) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);

    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
};

const Dropzone = forwardRef<HTMLDivElement, TDropzoneProps>(
  (
    {
      color = 'primary',
      variant = 'surface',
      size = 'md',
      padding,
      gap,
      title = 'Upload files',
      description = 'Drag and drop files here, or click to browse.',
      icon,
      accept,
      multiple = true,
      disabled = false,
      files: filesProp,
      defaultFiles,
      onFiles,
      onReject,
      onRemove,
      renderPreview,
      reuploadLabel = 'Reupload',
      removeLabel = 'Remove',
      dropLabel = 'Drop to replace',
      name,
      inputProps,
      onClick,
      onKeyDown,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      className,
      slotProps,
      ...props
    },
    forwardedRef,
  ) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [active, setActive] = useState(false);
    const dragDepth = useRef(0);
    const [innerFiles, setInnerFiles] = useState<File[]>(
      defaultFiles ?? EMPTY_FILES,
    );
    const files = filesProp ?? innerFiles;
    const acceptList = useMemo(() => toAcceptList(accept), [accept]);
    const urls = useObjectUrls(renderPreview ? files : EMPTY_FILES);
    const hasPreview = renderPreview != null && files.length > 0;

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const emitFiles = useCallback(
      (list: FileList | File[] | null) => {
        if (!list || disabled) {
          return;
        }
        const incoming = Array.from(list);
        const accepted = incoming.filter((file) =>
          matchesAccept(file, acceptList),
        );
        const rejected = incoming.filter(
          (file) => !matchesAccept(file, acceptList),
        );
        if (rejected.length > 0) {
          onReject?.(rejected);
        }
        const next = multiple ? accepted : accepted.slice(0, 1);
        if (next.length === 0) {
          return;
        }
        if (filesProp === undefined) {
          setInnerFiles(next);
        }
        onFiles?.(next);
      },
      [acceptList, disabled, filesProp, multiple, onFiles, onReject],
    );

    const removeFiles = useCallback(() => {
      if (disabled) {
        return;
      }
      if (filesProp === undefined) {
        setInnerFiles(EMPTY_FILES);
      }
      onRemove?.();
    }, [disabled, filesProp, onRemove]);

    const openFileDialog = useCallback(() => {
      if (disabled) {
        return;
      }
      inputRef.current?.click();
    }, [disabled]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled || hasPreview) {
        return;
      }
      openFileDialog();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled || hasPreview) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFileDialog();
      }
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
      onDragEnter?.(event);
      if (disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current += 1;
      setActive(true);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      onDragOver?.(event);
      if (disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'copy';
      setActive(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
      onDragLeave?.(event);
      if (disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) {
        setActive(false);
      }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      onDrop?.(event);
      if (disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = 0;
      setActive(false);
      emitFiles(event.dataTransfer.files);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      emitFiles(event.target.files);
      event.target.value = '';
    };

    return (
      <SDropzone
        ref={setRefs}
        role={hasPreview ? undefined : 'button'}
        tabIndex={hasPreview ? undefined : disabled ? -1 : 0}
        color={color}
        variant={variant}
        size={size}
        padding={padding}
        gap={gap}
        hasPreview={hasPreview}
        active={active}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        data-active={active ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        data-preview={hasPreview ? 'true' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
        className={mergeClasses(
          dropzoneClasses.root,
          active && dropzoneClasses.active,
          disabled && dropzoneClasses.disabled,
          className,
        )}
      >
        <SDropzoneInput
          {...mergeSlotProps(
            {
              ...inputProps,
              ref: inputRef,
              id: inputId,
              type: 'file',
              name,
              accept: acceptList.length > 0 ? acceptList.join(',') : undefined,
              multiple,
              disabled,
              tabIndex: -1,
              'aria-hidden': true,
              onChange: handleInputChange,
              onClick: (event) => event.stopPropagation(),
            },
            slotProps?.input,
          )}
        />

        {hasPreview ? (
          <>
            <SDropzonePreview
              {...mergeSlotProps(
                {
                  className: dropzoneClasses.preview,
                },
                slotProps?.preview,
              )}
            >
              {renderPreview({
                files,
                urls,
                reupload: openFileDialog,
                remove: removeFiles,
              })}
            </SDropzonePreview>

            <SDropzoneOverlay
              {...mergeSlotProps(
                {
                  className: dropzoneClasses.overlay,
                },
                slotProps?.overlay,
              )}
            >
              {active ? (
                dropLabel
              ) : (
                <SDropzoneActions {...slotProps?.actions}>
                  <Button
                    {...mergeSlotProps(
                      {
                        size: 'sm',
                        color: 'light',
                        disabled,
                        onClick: (event) => {
                          event.stopPropagation();
                          openFileDialog();
                        },
                      },
                      slotProps?.reuploadButton,
                    )}
                  >
                    {reuploadLabel}
                  </Button>
                  <Button
                    {...mergeSlotProps(
                      {
                        size: 'sm',
                        color: 'light',
                        variant: 'outline',
                        disabled,
                        onClick: (event) => {
                          event.stopPropagation();
                          removeFiles();
                        },
                      },
                      slotProps?.removeButton,
                    )}
                  >
                    {removeLabel}
                  </Button>
                </SDropzoneActions>
              )}
            </SDropzoneOverlay>
          </>
        ) : (
          <>
            <SDropzoneIcon
              {...mergeSlotProps(
                {
                  'aria-hidden': true,
                },
                slotProps?.icon,
              )}
            >{icon ?? <UploadIcon />}</SDropzoneIcon>

            {title != null ? (
              <SDropzoneTitle {...slotProps?.title}>{title}</SDropzoneTitle>
            ) : null}

            {description != null ? (
              <SDropzoneDescription {...slotProps?.description}>
                {description}
              </SDropzoneDescription>
            ) : null}
          </>
        )}
      </SDropzone>
    );
  },
);

Dropzone.displayName = 'Dropzone';

export type {
  TDropzoneProps,
  TDropzoneSlotProps,
  TDropzoneSize,
  TDropzoneSpacing,
  TDropzonePreviewContext,
} from './types';
export { dropzoneClasses } from './classes';
export { Dropzone };
export default Dropzone;
