import React, { useEffect, useMemo, useState } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { inputFileFieldModalClasses } from './classes';
import {
  formatFileSize,
  mergeFiles,
  sameFile,
} from '../../../helpers/files';
import { CloseIcon, FileIcon } from '../../../icons';
import { Button } from '../../button';
import { Dropzone } from '../../dropzone';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../empty';
import { IconButton } from '../../icon-button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemIcon,
  ItemTitle,
} from '../../item';
import { Modal } from '../../modal';
import { Text } from '../../text';
import {
  SInputFileFieldModalContent,
  SInputFileFieldModalList,
} from './styles';
import { TInputFileFieldModalProps } from './types';

const createFileId = (file: File, index: number) =>
  `${file.name}-${file.size}-${file.lastModified}-${index}`;

const FileThumb = ({ file }: { file: File }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith('image/')) {
      setSrc(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (src) {
    return <img src={src} alt="" />;
  }

  return <FileIcon />;
};

const InputFileFieldModal = ({
  files = [],
  accept,
  disabled = false,
  color = 'primary',
  variant = 'surface',
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
      variant="surface"
      onClose={handleCancel}
      title={title}
      description={description}
      headerActions={
        <IconButton
          variant="ghost"
          color="default"
          radius="pill"
          aria-label="Close"
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      }
      actions={
        <>
          <Button variant="outline" color="default" onClick={handleCancel}>
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
          variant={variant}
          accept={accept}
          multiple
          disabled={disabled}
          title="Add more files"
          description="Drag and drop files here, or click to browse."
          onFiles={handleDropzoneFiles}
        />

        {entries.length > 0 ? (
          <SInputFileFieldModalList
            className={inputFileFieldModalClasses.list}
            aria-label="Selected files"
          >
            <Text size="sm">
              {`${draft.length} file${draft.length === 1 ? '' : 's'} selected`}
            </Text>
            {entries.map((entry) => (
              <Item key={entry.id} size="sm" radius="md" appearance="opaque">
                <ItemIcon>
                  <FileThumb file={entry.file} />
                </ItemIcon>
                <ItemContent>
                  <ItemTitle>{entry.file.name}</ItemTitle>
                  <ItemDescription>
                    {formatFileSize(entry.file.size)}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <IconButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    color="default"
                    aria-label={`Remove ${entry.file.name}`}
                    disabled={disabled}
                    onClick={() => handleRemove(entry.file)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ItemActions>
              </Item>
            ))}
          </SInputFileFieldModalList>
        ) : (
          <Empty appearance="transparent">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileIcon />
              </EmptyMedia>
              <EmptyTitle>No files selected</EmptyTitle>
              <EmptyDescription>
                Drop files above to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </SInputFileFieldModalContent>
    </Modal>
  );
};

InputFileFieldModal.displayName = 'InputFileFieldModal';

export type { TInputFileFieldModalProps } from './types';
export { inputFileFieldModalClasses } from './classes';
export { InputFileFieldModal };
export default InputFileFieldModal;
