import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { mergeFiles } from '../../../helpers/files';
import { CloseIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
import { InputFileFieldModal } from '../input-file-field-modal';
import {
  SInputFileField,
  SInputFileFieldActions,
  SInputFileFieldHiddenInput,
  SInputFileFieldPlaceholder,
  SInputFileFieldText,
  SInputFileFieldTrigger,
  SInputFileFieldValue,
} from './styles';
import { TInputFileFieldProps } from './types';

const InputFileField = forwardRef<HTMLDivElement, TInputFileFieldProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      multiple = false,
      accept,
      placeholder = 'Choose file…',
      disabled = false,
      name,
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      id,
      modalTitle = 'Manage files',
      modalDescription = 'Add files with the dropzone, or remove files from the list.',
      ...props
    },
    forwardedRef,
  ) => {
    const inputId = useId();
    const isControlled = value !== undefined;
    const [uncontrolledFiles, setUncontrolledFiles] =
      useState<File[]>(defaultValue);
    const files = isControlled ? value : uncontrolledFiles;
    const [modalOpen, setModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const setFiles = useCallback(
      (next: File[]) => {
        const normalized = multiple ? next : next.slice(0, 1);
        if (!isControlled) {
          setUncontrolledFiles(normalized);
        }
        onChange?.(normalized);
      },
      [isControlled, multiple, onChange],
    );

    useEffect(() => {
      if (!multiple && modalOpen) {
        setModalOpen(false);
      }
    }, [modalOpen, multiple]);

    const openPicker = () => {
      if (disabled) {
        return;
      }
      inputRef.current?.click();
    };

    const handleTriggerClick = () => {
      if (disabled) {
        return;
      }
      if (multiple) {
        setModalOpen(true);
        return;
      }
      openPicker();
    };

    const handleClear = (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (disabled) {
        return;
      }
      setFiles([]);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const list = event.target.files;
      if (!list || list.length === 0) {
        return;
      }
      const incoming = Array.from(list);
      setFiles(mergeFiles(files, incoming, multiple));
      event.target.value = '';
    };

    const handleModalConfirm = (next: File[]) => {
      setFiles(next);
      setModalOpen(false);
    };

    const handleModalCancel = () => {
      setModalOpen(false);
    };

    const displayLabel = (() => {
      if (files.length === 0) {
        return null;
      }
      if (multiple) {
        return `${files.length} file${files.length === 1 ? '' : 's'}`;
      }
      return files[0]?.name ?? null;
    })();

    return (
      <SInputFileField ref={forwardedRef} {...props}>
        {name != null
          ? files.map((file, index) => (
              <input
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                type="hidden"
                name={name}
                value={file.name}
                disabled={disabled}
              />
            ))
          : null}

        <SInputFileFieldHiddenInput
          ref={inputRef}
          id={id ?? inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden
          onChange={handleInputChange}
          onClick={(event) => event.stopPropagation()}
        />

        <SInputFileFieldTrigger
          type="button"
          disabled={disabled}
          variant={variant}
          size={size}
          color={color}
          open={modalOpen}
          data-open={modalOpen ? 'true' : undefined}
          aria-haspopup={multiple ? 'dialog' : undefined}
          aria-expanded={multiple ? modalOpen : undefined}
          onClick={handleTriggerClick}
        >
          <SInputFileFieldValue>
            {displayLabel != null ? (
              <SInputFileFieldText>{displayLabel}</SInputFileFieldText>
            ) : (
              <SInputFileFieldPlaceholder>
                {placeholder}
              </SInputFileFieldPlaceholder>
            )}
          </SInputFileFieldValue>

          {files.length > 0 ? (
            <SInputFileFieldActions>
              <IconButton
                type="button"
                size={size}
                variant="ghost"
                color={color}
                aria-label={multiple ? 'Clear files' : 'Remove file'}
                disabled={disabled}
                onClick={handleClear}
              >
                <CloseIcon width="1em" height="1em" />
              </IconButton>
            </SInputFileFieldActions>
          ) : null}
        </SInputFileFieldTrigger>

        {modalOpen && multiple ? (
          <InputFileFieldModal
            files={files}
            accept={accept}
            disabled={disabled}
            color={color}
            title={modalTitle}
            description={modalDescription}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        ) : null}
      </SInputFileField>
    );
  },
);

InputFileField.displayName = 'InputFileField';

export type { TInputFileFieldProps } from './types';
export { InputFileField };
export default InputFileField;
