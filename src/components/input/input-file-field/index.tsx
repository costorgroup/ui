import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputFileFieldClasses } from './classes';
import { mergeFiles } from '../../../helpers/files';
import { CloseIcon } from '../../../icons';
import { InputButton } from '../input-button';
import { InputFileFieldModal } from '../input-file-field-modal';
import { InputWrapper } from '../input-wrapper';
import {
  SInputFileField,
  SInputFileFieldHiddenInput,
  SInputFileFieldPlaceholder,
  SInputFileFieldText,
  SInputFileFieldTrigger,
  SInputFileFieldValue,
} from './styles';
import { TInputFileFieldProps } from './types';
import { mergeSlotProps } from '../../../helpers/slot-props';

const InputFileField = forwardRef<HTMLDivElement, TInputFileFieldProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      multiple = false,
      accept,
      placeholder = 'Choose file…',
      disabled: disabledProp,
      name,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      id,
      modalTitle = 'Manage files',
      modalDescription = 'Add files with the dropzone, or remove files from the list.',
      className,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      slotProps,
      ...props
    },
    forwardedRef,
  ) => {
    const form = useFormControlState({
      disabled: disabledProp,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      id,
    });
    const disabled = form.disabled;
    const size = form.size;
    const color = form.color;
    const variant = form.variant;
    const fieldId = id ?? form.id;
    const error = isAriaInvalid(ariaInvalid) || form.error;
    const isControlled = value !== undefined;
    const [uncontrolledFiles, setUncontrolledFiles] =
      useState<File[]>(defaultValue);
    const files = isControlled ? value : uncontrolledFiles;
    const [modalOpen, setModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const setFiles = useCallback(
      (next: File[], event?: unknown) => {
        const normalized = multiple ? next : next.slice(0, 1);
        if (!isControlled) {
          setUncontrolledFiles(normalized);
        }
        onChange?.(normalized);
        form.onChange?.(event, normalized);
      },
      [form.onChange, isControlled, multiple, onChange],
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
      setFiles(mergeFiles(files, incoming, multiple), event);
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
      <SInputFileField
        ref={forwardedRef}
        {...props}
        className={mergeClasses(
          inputFileFieldClasses.root,
          disabled && inputFileFieldClasses.disabled,
          error && inputFileFieldClasses.error,
          modalOpen && inputFileFieldClasses.open,
          className,
        )}
      >
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
          {...mergeSlotProps(
            {
              ref: inputRef,
              id: fieldId,
              type: 'file',
              accept,
              multiple,
              disabled,
              tabIndex: -1,
              'aria-hidden': true,
              onChange: handleInputChange,
              onClick: (event) => event.stopPropagation(),
            },
            slotProps?.fileInput,
          )}
        />

        <InputWrapper
          {...mergeSlotProps(
            {
              open: modalOpen,
              trigger: true,
            },
            slotProps?.wrapper,
          )}
        >
          <SInputFileFieldTrigger
            {...mergeSlotProps(
              {
                type: 'button',
                size,
                'aria-haspopup': multiple ? 'dialog' : undefined,
                'aria-expanded': multiple ? modalOpen : undefined,
                'aria-invalid': error || undefined,
                'aria-describedby': ariaDescribedBy ?? form.helperId,
                onClick: handleTriggerClick,
              },
              slotProps?.trigger,
            )}
          >
            <SInputFileFieldValue {...slotProps?.value}>
              {displayLabel != null ? (
                <SInputFileFieldText {...slotProps?.text}>
                  {displayLabel}
                </SInputFileFieldText>
              ) : (
                <SInputFileFieldPlaceholder {...slotProps?.placeholder}>
                  {placeholder}
                </SInputFileFieldPlaceholder>
              )}
            </SInputFileFieldValue>
          </SInputFileFieldTrigger>
          {files.length > 0 ? (
            <InputButton
              {...mergeSlotProps(
                {
                  type: 'button',
                  'aria-label': multiple ? 'Clear files' : 'Remove file',
                  disabled,
                  onClick: handleClear,
                },
                slotProps?.clearButton,
              )}
            >
              <CloseIcon />
            </InputButton>
          ) : null}
        </InputWrapper>

        {modalOpen && multiple ? (
          <InputFileFieldModal
            {...mergeSlotProps(
              {
                files,
                accept,
                disabled,
                color,
                variant,
                title: modalTitle,
                description: modalDescription,
                onConfirm: handleModalConfirm,
                onCancel: handleModalCancel,
              },
              slotProps?.modal,
            )}
          />
        ) : null}
      </SInputFileField>
    );
  },
);

InputFileField.displayName = 'InputFileField';

export type { TInputFileFieldProps, TInputFileFieldSlotProps } from './types';
export { inputFileFieldClasses } from './classes';
export { InputFileField };
export default InputFileField;
