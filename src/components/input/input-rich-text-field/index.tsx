import React, {
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  isAriaInvalid,
  mergeClasses,
} from '../../../helpers/generate-utility-classes';
import { useFormControlState } from '../../form-control/context';
import { inputRichTextFieldClasses } from './classes';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { InputWrapper } from '../input-wrapper';
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
      disabled: disabledProp,
      editable,
      showToolbar = true,
      toolbar,
      extensions: extensionsProp,
      rows = 4,
      minHeight,
      variant: variantProp,
      size: sizeProp,
      color: colorProp,
      id,
      name,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      className,
      actionBar,
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
    const variant = form.variant;
    const size = form.size;
    const color = form.color;
    const fieldId = id ?? form.id;
    const error = isAriaInvalid(ariaInvalid) || form.error;
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
            ...(fieldId ? { id: fieldId } : {}),
            ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
            ...(error ? { 'aria-invalid': 'true' } : {}),
            ...(form.helperId ? { 'aria-describedby': form.helperId } : {}),
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
      <div
        ref={forwardedRef}
        className={mergeClasses(inputRichTextFieldClasses.root, className)}
        onMouseDown={handleMouseDown}
      >
        <InputWrapper
          variant={variant}
          size={size}
          color={color}
          disabled={disabled}
          stacked
          actionBar={actionBar}
        >
          <SInputRichTextField size={size}>
            {name != null ? (
              <input
                type="hidden"
                name={name}
                value={editor?.getHTML() ?? ''}
              />
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
        </InputWrapper>
      </div>
    );
  },
);

InputRichTextField.displayName = 'InputRichTextField';

export type { TInputRichTextFieldProps } from './types';
export { inputRichTextFieldClasses } from './classes';
export { InputRichTextField };
export default InputRichTextField;
