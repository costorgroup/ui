import React, {
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  SInputRichTextContent,
  SInputRichTextField,
} from './styles';
import { RichTextToolbar } from './toolbar';
import { TInputRichTextFieldProps } from './types';

const resolveMinHeight = (
  minHeight: number | string | undefined,
  rows: number,
) => {
  if (typeof minHeight === 'number') {
    return `${minHeight}px`;
  }

  if (typeof minHeight === 'string') {
    return minHeight;
  }

  return `calc(1.5em * ${rows})`;
};

const InputRichTextField = forwardRef<HTMLDivElement, TInputRichTextFieldProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      onEditorReady,
      placeholder,
      disabled = false,
      editable,
      showToolbar = true,
      toolbar,
      extensions: extensionsProp,
      rows = 4,
      minHeight,
      variant = 'subtle',
      size = 'md',
      color = 'primary',
      id,
      name,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      className,
    },
    forwardedRef,
  ) => {
    const isEditable = editable ?? !disabled;
    const isControlled = value !== undefined;
    const lastEmittedHtml = useRef<string | null>(null);
    const onChangeRef = useRef(onChange);
    const onEditorReadyRef = useRef(onEditorReady);

    onChangeRef.current = onChange;
    onEditorReadyRef.current = onEditorReady;

    const extensions = useMemo(() => {
      if (extensionsProp) {
        return extensionsProp;
      }

      return [
        StarterKit.configure({
          heading: false,
        }),
        Underline,
        Placeholder.configure({
          placeholder: placeholder ?? '',
        }),
      ];
    }, [extensionsProp, placeholder]);

    const editor = useEditor(
      {
        extensions,
        content: isControlled ? value : defaultValue,
        editable: isEditable,
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        editorProps: {
          attributes: {
            ...(id ? { id } : {}),
            ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
            ...(ariaInvalid != null
              ? { 'aria-invalid': String(ariaInvalid) }
              : {}),
            role: 'textbox',
            'aria-multiline': 'true',
          },
        },
        onUpdate: ({ editor: nextEditor }) => {
          const html = nextEditor.getHTML();
          lastEmittedHtml.current = html;
          onChangeRef.current?.(html);
        },
      },
      [extensions],
    );

    useEffect(() => {
      if (!editor) {
        return;
      }

      onEditorReadyRef.current?.(editor);
    }, [editor]);

    useEffect(() => {
      if (!editor) {
        return;
      }

      editor.setEditable(isEditable);
    }, [editor, isEditable]);

    useEffect(() => {
      if (!editor || !isControlled) {
        return;
      }

      const next = value ?? '';
      if (next === lastEmittedHtml.current || next === editor.getHTML()) {
        return;
      }

      editor.commands.setContent(next, { emitUpdate: false });
      lastEmittedHtml.current = next;
    }, [editor, isControlled, value]);

    const contentMinHeight = resolveMinHeight(minHeight, rows);

    const handleMouseDown = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (disabled || !editor) {
          return;
        }

        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        if (
          target.closest(
            'button, a, input, textarea, select, [role="toolbar"]',
          )
        ) {
          return;
        }

        if (!editor.isFocused) {
          editor.chain().focus().run();
        }
      },
      [disabled, editor],
    );

    return (
      <SInputRichTextField
        ref={forwardedRef}
        className={className}
        variant={variant}
        size={size}
        color={color}
        disabled={disabled}
        onMouseDown={handleMouseDown}
      >
        {name != null ? (
          <input type="hidden" name={name} value={editor?.getHTML() ?? ''} />
        ) : null}

        {showToolbar
          ? (toolbar ??
            (editor ? (
              <RichTextToolbar
                editor={editor}
                size={size}
                color={color}
                disabled={disabled || !isEditable}
              />
            ) : null))
          : null}

        <SInputRichTextContent minHeight={contentMinHeight}>
          <EditorContent editor={editor} />
        </SInputRichTextContent>
      </SInputRichTextField>
    );
  },
);

InputRichTextField.displayName = 'InputRichTextField';

export type { TInputRichTextFieldProps } from './types';
export { InputRichTextField };
export default InputRichTextField;
