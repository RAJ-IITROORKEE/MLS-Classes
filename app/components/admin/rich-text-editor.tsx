'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType, type MouseEvent } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { Table, TableCell as BaseTableCell, TableHeader as BaseTableHeader, TableRow } from '@tiptap/extension-table';
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
  Clipboard,
  FileText,
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
const tableCellBackgroundColors = ['#ffffff', '#f8fafc', '#fef3c7', '#dcfce7', '#dbeafe', '#fce7f3', '#ede9fe'];
const tablePickerRows = 8;
const tablePickerCols = 8;

type MammothModule = {
  convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<{
    value: string;
    messages?: Array<{ message?: string }>;
  }>;
};

type TableContextMenuState = {
  x: number;
  y: number;
} | null;

const isEditorJson = (value: unknown): value is { type: string; content?: unknown[] } =>
  Boolean(value) && typeof value === 'object' && 'type' in (value as Record<string, unknown>);

const cellBackgroundAttribute = {
  backgroundColor: {
    default: null,
    parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
    renderHTML: (attributes: { backgroundColor?: string | null }) =>
      attributes.backgroundColor
        ? { style: `background-color: ${attributes.backgroundColor}` }
        : {},
  },
};

const TableHeader = BaseTableHeader.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      ...cellBackgroundAttribute,
    };
  },
});

const TableCell = BaseTableCell.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      ...cellBackgroundAttribute,
    };
  },
});

const cleanImportedHtml = (html: string) => {
  if (typeof window === 'undefined') {
    return html;
  }

  const document = new DOMParser().parseFromString(html, 'text/html');
  document.querySelectorAll('script, style, iframe, object, embed, link, meta').forEach((node) => node.remove());

  document.body.querySelectorAll<HTMLElement>('*').forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const allowedAttributes = ['href', 'src', 'alt', 'title', 'colspan', 'rowspan'];

    Array.from(element.attributes).forEach((attribute) => {
      if (!allowedAttributes.includes(attribute.name.toLowerCase())) {
        element.removeAttribute(attribute.name);
      }
    });

    if (tagName === 'a') {
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return document.body.innerHTML.trim();
};

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
  importing,
  onPickImage,
  onPickDocx,
  onImportHtml,
}: {
  editor: Editor;
  uploading: boolean;
  importing: boolean;
  onPickImage: () => void;
  onPickDocx: () => void;
  onImportHtml: (html: string) => void;
}) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showTextColors, setShowTextColors] = useState(false);
  const [showHighlightColors, setShowHighlightColors] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tableSize, setTableSize] = useState({ rows: 3, cols: 3 });
  const [importHtml, setImportHtml] = useState('');

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
    <div className="sticky top-2 z-20 rounded-t-xl border-b bg-slate-50/95 p-2 shadow-sm backdrop-blur dark:bg-slate-900/95 sm:top-16">
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
        <ToolbarButton icon={FileText} onClick={onPickDocx} title="Import DOCX" disabled={importing} />
        <ToolbarButton
          icon={Clipboard}
          onClick={() => {
            setShowImportPanel((prev) => !prev);
            setShowTablePicker(false);
          }}
          isActive={showImportPanel}
          title="Paste/import HTML"
          disabled={importing}
        />
        <ToolbarButton
          icon={Table2}
          onClick={() => {
            setShowTablePicker((prev) => !prev);
            setShowTextColors(false);
            setShowHighlightColors(false);
          }}
          isActive={editor.isActive('table') || showTablePicker}
          title="Insert table grid"
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
            setShowTablePicker(false);
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
            setShowTablePicker(false);
          }}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        {(uploading || importing) && <Loader2 className="ml-1 h-4 w-4 animate-spin text-slate-500" />}
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

      {showTablePicker && (
        <div className="mt-2 w-fit rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-950">
          <div className="mb-2 flex items-center justify-between gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>Insert table</span>
            <span>{tableSize.rows} x {tableSize.cols}</span>
          </div>
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${tablePickerCols}, minmax(0, 1fr))` }}>
            {Array.from({ length: tablePickerRows * tablePickerCols }).map((_, index) => {
              const row = Math.floor(index / tablePickerCols) + 1;
              const col = (index % tablePickerCols) + 1;
              const isSelected = row <= tableSize.rows && col <= tableSize.cols;

              return (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  className={cn(
                    'h-5 w-5 rounded-sm border transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/20'
                      : 'border-slate-300 bg-slate-50 hover:border-primary dark:border-slate-700 dark:bg-slate-900'
                  )}
                  onMouseEnter={() => setTableSize({ rows: row, cols: col })}
                  onFocus={() => setTableSize({ rows: row, cols: col })}
                  onClick={() => {
                    editor.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow: true }).run();
                    setShowTablePicker(false);
                  }}
                  aria-label={`Insert ${row} by ${col} table`}
                />
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Hover to choose rows and columns, then click to insert.
          </p>
        </div>
      )}

      {showImportPanel && (
        <div className="mt-2 rounded-xl border bg-white p-3 shadow-sm dark:bg-slate-950">
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Import copied content</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paste from Google Docs or a designed HTML document. Existing editor content will be replaced after confirmation.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setImportHtml('');
                setShowImportPanel(false);
              }}
            >
              Close
            </Button>
          </div>
          <textarea
            value={importHtml}
            onChange={(event) => setImportHtml(event.target.value)}
            placeholder="Paste HTML or copied Google Docs content here..."
            className="min-h-28 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setImportHtml('')}
              disabled={!importHtml.trim()}
            >
              Clear
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onImportHtml(importHtml);
                setImportHtml('');
                setShowImportPanel(false);
              }}
              disabled={!importHtml.trim() || importing}
            >
              <Clipboard className="h-4 w-4" />
              Import Content
            </Button>
          </div>
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
  const [importing, setImporting] = useState(false);
  const [tableMenu, setTableMenu] = useState<TableContextMenuState>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const docxInputRef = useRef<HTMLInputElement>(null);

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
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'font-medium text-primary underline underline-offset-4',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
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
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'blog-editor-table',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'blog-editor-table-header',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'blog-editor-table-cell',
        },
      }),
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
          'max-w-none p-5 text-slate-900 dark:text-slate-50 sm:p-6 focus:outline-none',
          '[&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight',
          '[&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight',
          '[&_p]:my-3 [&_p]:leading-8 [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic dark:[&_blockquote]:border-slate-700',
          '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1',
          '[&_img]:my-6 [&_img]:rounded-xl [&_img]:shadow-md',
          '[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-50',
          '[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 dark:[&_code]:bg-slate-800',
          '[&_.tableWrapper]:my-6 [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:rounded-2xl [&_.tableWrapper]:border [&_.tableWrapper]:border-slate-200 dark:[&_.tableWrapper]:border-slate-800',
          '[&_table]:w-full [&_table]:min-w-[520px] [&_table]:border-collapse [&_table]:text-sm',
          '[&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-900 dark:[&_th]:border-slate-700 dark:[&_th]:bg-slate-900 dark:[&_th]:text-slate-50',
          '[&_td]:border [&_td]:border-slate-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top dark:[&_td]:border-slate-800',
          '[&_td_p]:my-0 [&_th_p]:my-0',
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

  const replaceContentFromHtml = useCallback(
    (html: string) => {
      if (!editor) {
        return;
      }

      const cleanedHtml = cleanImportedHtml(html);
      if (!cleanedHtml) {
        toast.error('No importable content found');
        return;
      }

      const hasExistingContent = Boolean(editor.getText().trim()) || editor.getJSON().content?.some((node) => node.type !== 'paragraph');
      if (hasExistingContent && !window.confirm('Importing will replace the current blog content. Continue?')) {
        return;
      }

      editor.commands.setContent(cleanedHtml, { emitUpdate: true });
      toast.success('Content imported into editor');
    },
    [editor]
  );

  const handlePickDocx = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.docx')) {
      toast.error('Please upload a .docx file');
      return;
    }

    try {
      setImporting(true);
      const mammoth = (await import('mammoth')) as MammothModule;
      const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });

      replaceContentFromHtml(result.value);

      if (result.messages?.length) {
        toast.info('DOCX imported. Please review formatting before publishing.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to import DOCX');
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    if (!tableMenu) {
      return;
    }

    const closeMenu = () => setTableMenu(null);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTableMenu(null);
      }
    };

    window.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeMenu, true);
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('scroll', closeMenu, true);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [tableMenu]);

  const handleEditorContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (!editor) {
      return;
    }

    const target = event.target as HTMLElement;
    if (!target.closest('td, th')) {
      setTableMenu(null);
      return;
    }

    event.preventDefault();
    const position = editor.view.posAtCoords({ left: event.clientX, top: event.clientY });

    if (position) {
      editor.chain().focus().setTextSelection(position.pos).run();
    } else {
      editor.commands.focus();
    }

    setTableMenu({ x: event.clientX, y: event.clientY });
  };

  const runTableCommand = (command: () => boolean) => {
    command();
    setTableMenu(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <FormattingToolbar
        editor={editor}
        uploading={uploading}
        importing={importing}
        onPickImage={() => inputRef.current?.click()}
        onPickDocx={() => docxInputRef.current?.click()}
        onImportHtml={replaceContentFromHtml}
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

      <input
        ref={docxInputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }

          await handlePickDocx(file);
          event.target.value = '';
        }}
      />

      <div onContextMenu={handleEditorContextMenu}>
        <EditorContent editor={editor} className="overflow-x-auto rounded-b-xl bg-white dark:bg-slate-950" />
      </div>

      {tableMenu && (
        <div
          className="fixed z-50 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          style={{
            left: Math.max(8, Math.min(tableMenu.x, window.innerWidth - 272)),
            top: Math.max(8, Math.min(tableMenu.y, window.innerHeight - 420)),
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b bg-slate-50 px-3 py-2 dark:bg-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Table options</p>
          </div>
          <div className="grid grid-cols-2 gap-1 p-2">
            <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().addRowBefore().run())}>Row above</Button>
            <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().addRowAfter().run())}>Row below</Button>
            <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().addColumnBefore().run())}>Column left</Button>
            <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().addColumnAfter().run())}>Column right</Button>
            <Button type="button" size="sm" variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={() => runTableCommand(() => editor.chain().focus().deleteRow().run())}>Delete row</Button>
            <Button type="button" size="sm" variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={() => runTableCommand(() => editor.chain().focus().deleteColumn().run())}>Delete column</Button>
          </div>
          <div className="border-t p-2 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-1">
              <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().mergeCells().run())}>Merge cells</Button>
              <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().splitCell().run())}>Split cell</Button>
              <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().toggleHeaderRow().run())}>Header row</Button>
              <Button type="button" size="sm" variant="ghost" className="justify-start" onClick={() => runTableCommand(() => editor.chain().focus().toggleHeaderColumn().run())}>Header column</Button>
            </div>
          </div>
          <div className="border-t p-3 dark:border-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-300">Cell background</p>
            <div className="flex flex-wrap gap-1.5">
              {tableCellBackgroundColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="h-6 w-6 rounded-md border border-slate-300 shadow-sm dark:border-slate-700"
                  style={{ backgroundColor: color }}
                  onClick={() => runTableCommand(() => editor.chain().focus().setCellAttribute('backgroundColor', color).run())}
                  aria-label={`Set cell background ${color}`}
                />
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-6 px-2 text-xs"
                onClick={() => runTableCommand(() => editor.chain().focus().setCellAttribute('backgroundColor', null).run())}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="border-t p-2 dark:border-slate-800">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => runTableCommand(() => editor.chain().focus().deleteTable().run())}
            >
              Delete table
            </Button>
          </div>
        </div>
      )}

      {!editor.getText().trim() && (
        <p className="pointer-events-none px-6 pb-4 text-sm text-slate-400">{placeholder}</p>
      )}
    </div>
  );
}
