import React from 'react';
import type { Editor } from '@tiptap/react';
import { IconButton } from '../../icon-button';
import { RedoIcon, UndoIcon } from '../../../icons';
import {
  SInputRichTextToolbar,
  SInputRichTextToolbarGroup,
} from './styles';
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  OrderedListIcon,
  QuoteIcon,
  StrikeIcon,
  UnderlineIcon,
} from './toolbar-icons';
import type { TInputSize } from '../input-wrapper/types';
import type { TPaletteColor } from '../../../theme/types';

type TRichTextToolbarProps = {
  editor: Editor;
  size: TInputSize;
  color: TPaletteColor;
  disabled: boolean;
};

const toolbarSizeMap: Record<TInputSize, 'xs' | 'sm' | 'md'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

const RichTextToolbar = ({
  editor,
  size,
  color,
  disabled,
}: TRichTextToolbarProps) => {
  const buttonSize = toolbarSizeMap[size];

  return (
    <SInputRichTextToolbar role="toolbar" aria-label="Formatting">
      <SInputRichTextToolbarGroup>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('bold') ? 'subtle' : 'ghost'}
          aria-label="Bold"
          aria-pressed={editor.isActive('bold')}
          disabled={disabled || !editor.can().chain().focus().toggleBold().run()}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('italic') ? 'subtle' : 'ghost'}
          aria-label="Italic"
          aria-pressed={editor.isActive('italic')}
          disabled={
            disabled || !editor.can().chain().focus().toggleItalic().run()
          }
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('underline') ? 'subtle' : 'ghost'}
          aria-label="Underline"
          aria-pressed={editor.isActive('underline')}
          disabled={
            disabled || !editor.can().chain().focus().toggleUnderline().run()
          }
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('strike') ? 'subtle' : 'ghost'}
          aria-label="Strikethrough"
          aria-pressed={editor.isActive('strike')}
          disabled={
            disabled || !editor.can().chain().focus().toggleStrike().run()
          }
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikeIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('code') ? 'subtle' : 'ghost'}
          aria-label="Inline code"
          aria-pressed={editor.isActive('code')}
          disabled={
            disabled || !editor.can().chain().focus().toggleCode().run()
          }
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <CodeIcon />
        </IconButton>
      </SInputRichTextToolbarGroup>

      <SInputRichTextToolbarGroup>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('bulletList') ? 'subtle' : 'ghost'}
          aria-label="Bullet list"
          aria-pressed={editor.isActive('bulletList')}
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleBulletList().run()
          }
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('orderedList') ? 'subtle' : 'ghost'}
          aria-label="Ordered list"
          aria-pressed={editor.isActive('orderedList')}
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleOrderedList().run()
          }
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <OrderedListIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant={editor.isActive('blockquote') ? 'subtle' : 'ghost'}
          aria-label="Blockquote"
          aria-pressed={editor.isActive('blockquote')}
          disabled={
            disabled ||
            !editor.can().chain().focus().toggleBlockquote().run()
          }
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <QuoteIcon />
        </IconButton>
      </SInputRichTextToolbarGroup>

      <SInputRichTextToolbarGroup>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant="ghost"
          aria-label="Undo"
          disabled={disabled || !editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          type="button"
          size={buttonSize}
          color={color}
          variant="ghost"
          aria-label="Redo"
          disabled={disabled || !editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </IconButton>
      </SInputRichTextToolbarGroup>
    </SInputRichTextToolbar>
  );
};

export { RichTextToolbar };
