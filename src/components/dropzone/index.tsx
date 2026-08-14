import React, {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import { UploadIcon } from '../../icons';
import {
  SDropzone,
  SDropzoneDescription,
  SDropzoneTitle,
  SDropzoneIcon,
  SDropzoneInput,
} from './styles';
import { TDropzoneProps } from './types';

const Dropzone = forwardRef<HTMLDivElement, TDropzoneProps>(
  (
    {
      color = 'primary',
      title = 'Upload files',
      description = 'Drag and drop files here, or click to browse.',
      icon,
      accept,
      multiple = true,
      disabled = false,
      onFiles,
      name,
      inputProps,
      onClick,
      onKeyDown,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      ...props
    },
    forwardedRef,
  ) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [active, setActive] = useState(false);
    const dragDepth = useRef(0);

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
        const files = Array.from(list);
        if (files.length === 0) {
          return;
        }
        onFiles?.(files);
      },
      [disabled, onFiles],
    );

    const openFileDialog = () => {
      if (disabled) {
        return;
      }
      inputRef.current?.click();
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) {
        return;
      }
      openFileDialog();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) {
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
        role="button"
        tabIndex={disabled ? -1 : 0}
        color={color}
        active={active}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        data-active={active ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
      >
        <SDropzoneInput
          {...inputProps}
          ref={inputRef}
          id={inputId}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden
          onChange={handleInputChange}
          onClick={(event) => event.stopPropagation()}
        />

        <SDropzoneIcon aria-hidden>{icon ?? <UploadIcon />}</SDropzoneIcon>

        {title != null ? <SDropzoneTitle>{title}</SDropzoneTitle> : null}

        {description != null ? (
          <SDropzoneDescription>{description}</SDropzoneDescription>
        ) : null}
      </SDropzone>
    );
  },
);

Dropzone.displayName = 'Dropzone';

export type { TDropzoneProps } from './types';
export { Dropzone };
export default Dropzone;
