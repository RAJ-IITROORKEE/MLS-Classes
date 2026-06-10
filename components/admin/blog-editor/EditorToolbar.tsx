'use client';

import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface EditorToolbarProps {
  editor: Editor;
}

const colors = [
  '#000000',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];

const highlights = [
  '#fef08a',
  '#fed7aa',
  '#fecaca',
  '#fca5a5',
  '#fecdd3',
  '#dcfce7',
  '#d1fae5',
  '#cffafe',
  '#dbeafe',
];

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showColors, setShowColors] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);

  const handleAddLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  const ToolButton = ({
    onClick,
    isActive,
    icon: Icon,
    label,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: any;
    label: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            size="sm"
            variant={isActive ? 'default' : 'ghost'}
            className="h-8 w-8 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-t-lg">
      {/* Text Formatting */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          label="Bold"
        />
        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          label="Italic"
        />
        <ToolButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={Underline}
          label="Underline"
        />
        <ToolButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={Strikethrough}
          label="Strikethrough"
        />
        <ToolButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={Code}
          label="Code"
        />
      </div>

      {/* Headings */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <ToolButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          icon={Heading1}
          label="Heading 1"
        />
        <ToolButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          label="Heading 2"
        />
      </div>

      {/* Lists */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          label="Bullet List"
        />
        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          label="Ordered List"
        />
      </div>

      {/* Quote & Blockquote */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
          label="Quote"
        />
      </div>

      {/* Alignment */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          icon={AlignLeft}
          label="Align Left"
        />
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          icon={AlignCenter}
          label="Align Center"
        />
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          icon={AlignRight}
          label="Align Right"
        />
      </div>

      {/* Colors */}
      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
        <Button
          size="sm"
          variant={showColors ? 'default' : 'ghost'}
          className="h-8 w-8 p-0"
          onClick={() => setShowColors(!showColors)}
          title="Text Color"
        >
          <Palette className="h-4 w-4" />
        </Button>
        {showColors && (
          <div className="flex gap-1 ml-1 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColors(false);
                }}
                className="h-6 w-6 rounded border border-gray-300 dark:border-gray-600 hover:opacity-80"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}

        <Button
          size="sm"
          variant={showHighlights ? 'default' : 'ghost'}
          className="h-8 w-8 p-0"
          onClick={() => setShowHighlights(!showHighlights)}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </Button>
        {showHighlights && (
          <div className="flex gap-1 ml-1 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            {highlights.map((color) => (
              <button
                key={color}
                onClick={() => {
                  editor.chain().focus().toggleHighlight({ color }).run();
                  setShowHighlights(false);
                }}
                className="h-6 w-6 rounded border border-gray-300 dark:border-gray-600 hover:opacity-80"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      {/* Link & Image */}
      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
              <DialogDescription>
                Enter the URL for your link
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddLink();
                }}
              />
              <Button onClick={handleAddLink} className="w-full">
                Add Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              title="Add Image"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                Enter the image URL
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddImage();
                }}
              />
              <Button onClick={handleAddImage} className="w-full">
                Add Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
