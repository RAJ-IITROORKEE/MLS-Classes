'use client';

import { useCallback, useRef, useState, type ComponentType } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  Loader2,
  Table2,
  Rows3,
  Columns3,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: unknown;
  onChange: (content: unknown) => void;
  placeholder?: string;
  minHeight?: string;
}

const textColors = ['#0f172a', '#ef4444', '#f97316', '#eab308', '#16a34a', '#0ea5e9', '#2563eb', '#db2777'];
const highlightColors = ['#fef08a', '#fde68a', '#fecaca', '#bfdbfe', '#c7d2fe', '#a7f3d0', '#fbcfe8'];

const isEditorJson = (value: unknown): value is { type: string; content?: unknown[] } =>
  Boolean(value) && typeof value === 'object' && 'type' in (value as Record<string, unknown>);

function ToolbarButton({
  icon: Icon,
  onClick,
  isActive,
  title,
  disabled,
}: {
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={isActive ? 'default' : 'ghost'}
      className="h-8 w-8 p-0"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

function FormattingToolbar({
  editor,
  uploading,
  onPickImage,
}: {
  editor: Editor;
  uploading: boolean;
  onPickImage: () => void;
}) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showTextColors, setShowTextColors] = useState(false);
  const [showHighlightColors, setShowHighlightColors] = useState(false);

  const applyLink = () => {
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.trim() }).run();
    setLinkUrl('');
    setShowLinkInput(false);
  };

  return (
    <div className="border-b bg-slate-50/90 p-2 dark:bg-slate-900/90">
      <div className="flex flex-wrap items-center gap-1">
        <ToolbarButton icon={Bold} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold" />
        <ToolbarButton icon={Italic} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic" />
        <ToolbarButton icon={UnderlineIcon} onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline" />
        <ToolbarButton icon={Strikethrough} onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strike" />
        <ToolbarButton icon={Code} onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Inline code" />

        <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-700" />

        <ToolbarButton icon={Heading1} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1" />
        <ToolbarButton icon={Heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2" />
        <ToolbarButton icon={List} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet list" />
        <ToolbarButton icon={ListOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered list" />
        <ToolbarButton icon={Quote} onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote" />

        <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-700" />

        <ToolbarButton icon={AlignLeft} onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align left" />
        <ToolbarButton icon={AlignCenter} onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align center" />
        <ToolbarButton icon={AlignRight} onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align right" />

        <div className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-700" />

        <ToolbarButton icon={LinkIcon} onClick={() => setShowLinkInput((prev) => !prev)} isActive={editor.isActive('link')} title="Link" />
        <ToolbarButton icon={ImageIcon} onClick={onPickImage} title="Upload image" disabled={uploading} />
        <ToolbarButton
          icon={Table2}
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          isActive={editor.isActive('table')}
          title="Insert table"
        />
        <ToolbarButton icon={Rows3} onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row" disabled={!editor.isActive('table')} />
        <ToolbarButton icon={Columns3} onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column" disabled={!editor.isActive('table')} />
        <ToolbarButton icon={Plus} onClick={() => editor.chain().focus().toggleHeaderRow().run()} title="Toggle header row" disabled={!editor.isActive('table')} />
        <ToolbarButton icon={Minus} onClick={() => editor.chain().focus().deleteRow().run()} title="Delete row" disabled={!editor.isActive('table')} />
        <ToolbarButton icon={Trash2} onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table" disabled={!editor.isActive('table')} />

        <Button
          type="button"
          size="sm"
          variant={showTextColors ? 'default' : 'ghost'}
          className="h-8 w-8 p-0"
          onClick={() => {
            setShowTextColors((prev) => !prev);
            setShowHighlightColors(false);
          }}
          title="Text color"
        >
          <Palette className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={showHighlightColors ? 'default' : 'ghost'}
          className="h-8 w-8 p-0"
          onClick={() => {
            setShowHighlightColors((prev) => !prev);
            setShowTextColors(false);
          }}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        {uploading && <Loader2 className="ml-1 h-4 w-4 animate-spin text-slate-500" />}
      </div>

      {showLinkInput && (
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && applyLink()}
            className="h-8"
          />
          <Button type="button" size="sm" onClick={applyLink}>
            Apply
          </Button>
        </div>
      )}

      {showTextColors && (
        <div className="mt-2 flex items-center gap-1 rounded border bg-white p-2 dark:bg-slate-950">
          {textColors.map((color) => (
            <button
              key={color}
              type="button"
              className="h-6 w-6 rounded border border-slate-300"
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setShowTextColors(false);
              }}
              title={color}
            />
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="ml-2 h-6"
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setShowTextColors(false);
            }}
          >
            Clear
          </Button>
        </div>
      )}

      {showHighlightColors && (
        <div className="mt-2 flex items-center gap-1 rounded border bg-white p-2 dark:bg-slate-950">
          {highlightColors.map((color) => (
            <button
              key={color}
              type="button"
              className="h-6 w-6 rounded border border-slate-300"
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().toggleHighlight({ color }).run();
                setShowHighlightColors(false);
              }}
              title={color}
            />
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="ml-2 h-6"
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
              setShowHighlightColors(false);
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing your article...',
  minHeight = 'min-h-[26rem]',
}: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blogs/editor');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Image upload failed');
    }

    const data = await response.json();
    if (!data.url) {
      throw new Error('Image upload failed');
    }

    return data.url as string;
  }, []);

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: isEditorJson(value)
      ? value
      : {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '' }],
            },
          ],
        },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getJSON());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-slate max-w-none p-6 dark:prose-invert focus:outline-none',
          'prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl',
          'prose-p:leading-8 prose-img:rounded-xl prose-img:shadow-md',
          'prose-table:my-8 prose-table:w-full prose-table:border-collapse',
          'prose-th:border prose-th:border-slate-300 prose-th:bg-slate-100 prose-th:px-3 prose-th:py-2 prose-th:text-left dark:prose-th:border-slate-700 dark:prose-th:bg-slate-900',
          'prose-td:border prose-td:border-slate-200 prose-td:px-3 prose-td:py-2 dark:prose-td:border-slate-800',
          'prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-700',
          'prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 dark:prose-code:bg-slate-800',
          minHeight
        ),
      },
    },
  });

  const handlePickImage = async (file: File) => {
    if (!editor) {
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <FormattingToolbar
        editor={editor}
        uploading={uploading}
        onPickImage={() => inputRef.current?.click()}
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }

          await handlePickImage(file);
          event.target.value = '';
        }}
      />

      <EditorContent editor={editor} className="bg-white dark:bg-slate-950" />

      {!editor.getText().trim() && (
        <p className="pointer-events-none px-6 pb-4 text-sm text-slate-400">{placeholder}</p>
      )}
    </div>
  );
}
