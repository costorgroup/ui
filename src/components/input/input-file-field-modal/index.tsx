import React, { useMemo, useState } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputFileFieldModalClasses } from './classes';
import {
  formatFileSize,
  mergeFiles,
  sameFile,
} from '../../../helpers/files';
import { CloseIcon } from '../../../icons';
import { Button } from '../../button';
import { Dropzone } from '../../dropzone';
import { Flex } from '../../flex';
import { Heading } from '../../heading';
import { IconButton } from '../../icon-button';
import { Modal } from '../../modal';
import { Text } from '../../text';
import {
  SInputFileFieldModalContent,
  SInputFileFieldModalEmpty,
  SInputFileFieldModalList,
  SInputFileFieldModalRow,
  SInputFileFieldModalRowMeta,
  SInputFileFieldModalRowName,
  SInputFileFieldModalRowSize,
} from './styles';
import { TInputFileFieldModalProps } from './types';

const createFileId = (file: File, index: number) =>
  `${file.name}-${file.size}-${file.lastModified}-${index}`;

const InputFileFieldModal = ({
  files = [],
  accept,
  disabled = false,
  color = 'primary',
  title = 'Manage files',
  description = 'Add files with the dropzone, or remove files from the list.',
  onConfirm,
  onCancel,
  className,
}: TInputFileFieldModalProps) => {
  const [draft, setDraft] = useState<File[]>(files);

  const entries = useMemo(
    () =>
      draft.map((file, index) => ({
        id: createFileId(file, index),
        file,
      })),
    [draft],
  );

  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.(draft);
  };

  const handleRemove = (target: File) => {
    if (disabled) {
      return;
    }
    setDraft((current) => current.filter((file) => !sameFile(file, target)));
  };

  const handleDropzoneFiles = (incoming: File[]) => {
    if (disabled) {
      return;
    }
    setDraft((current) => mergeFiles(current, incoming, true));
  };

  return (
    <Modal
      size="lg"
      onClose={handleCancel}
      title={
        <Flex direction="column" gap={0}>
          <Heading as="h4">{title}</Heading>
          {description != null ? <Text size="sm">{description}</Text> : null}
        </Flex>
      }
      actions={
        <>
          <Button variant="outline" color={color} onClick={handleCancel}>
            Cancel
          </Button>
          <Button color={color} onClick={handleConfirm} disabled={disabled}>
            Confirm
          </Button>
        </>
      }
      className={mergeClasses(
        inputFileFieldModalClasses.root,
        disabled && inputFileFieldModalClasses.disabled,
        className,
      )}
    >
      <SInputFileFieldModalContent>
        <Dropzone
          color={color}
          accept={accept}
          multiple
          disabled={disabled}
          title="Add more files"
          description="Drag and drop files here, or click to browse."
          onFiles={handleDropzoneFiles}
        />

        <Flex direction="column" gap="sm">
          <Text size="sm">
            {draft.length > 0
              ? `${draft.length} file${draft.length === 1 ? '' : 's'} selected`
              : 'No files selected'}
          </Text>

          {entries.length > 0 ? (
            <SInputFileFieldModalList role="table" aria-label="Selected files">
              {entries.map((entry) => (
                <SInputFileFieldModalRow key={entry.id} role="row">
                  <SInputFileFieldModalRowMeta role="cell">
                    <SInputFileFieldModalRowName title={entry.file.name}>
                      {entry.file.name}
                    </SInputFileFieldModalRowName>
                    <SInputFileFieldModalRowSize>
                      {formatFileSize(entry.file.size)}
                    </SInputFileFieldModalRowSize>
                  </SInputFileFieldModalRowMeta>
                  <IconButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    color={color}
                    aria-label={`Remove ${entry.file.name}`}
                    disabled={disabled}
                    onClick={() => handleRemove(entry.file)}
                  >
                    <CloseIcon width="1em" height="1em" />
                  </IconButton>
                </SInputFileFieldModalRow>
              ))}
            </SInputFileFieldModalList>
          ) : (
            <SInputFileFieldModalEmpty>
              Drop files above to get started.
            </SInputFileFieldModalEmpty>
          )}
        </Flex>
      </SInputFileFieldModalContent>
    </Modal>
  );
};

InputFileFieldModal.displayName = 'InputFileFieldModal';

export type { TInputFileFieldModalProps } from './types';
export { inputFileFieldModalClasses } from './classes';
export { InputFileFieldModal };
export default InputFileFieldModal;
