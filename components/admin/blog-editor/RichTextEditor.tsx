'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { EditorToolbar } from './EditorToolbar';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface RichTextEditorProps {
  value: any; // TipTap JSON
  onChange: (value: any) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start typing your blog content...',
  minHeight = '500px',
}: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      toast.success('Image uploaded');
      return data.secure_url;
    } catch (error) {
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value || {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [],
        },
      ],
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert max-w-none w-full focus:outline-none px-6 py-4 rounded-b-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50',
        style: `min-height: ${minHeight}`,
      },
      handleDOMEvents: {
        drop: async (view, event) => {
          const files = Array.from(event.dataTransfer?.files || []);
          const imageFile = files.find((file) => file.type.startsWith('image/'));

          if (imageFile) {
            event.preventDefault();
            try {
              const imageUrl = await uploadImage(imageFile);
              const { state, dispatch } = view;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (coordinates) {
                const transaction = state.tr.insert(
                  coordinates.pos,
                  state.schema.nodes.image.create({ src: imageUrl })
                );
                dispatch(transaction);
              }
            } catch (error) {
              console.error('Failed to handle dropped image:', error);
            }
            return true;
          }
          return false;
        },
        paste: async (_, event) => {
          const items = Array.from(event.clipboardData?.items || []);
          const imageItem = items.find((item) => item.type.startsWith('image/'));

          if (imageItem) {
            event.preventDefault();
            const file = imageItem.getAsFile();
            if (file) {
              try {
                const imageUrl = await uploadImage(file);
                // Image will be inserted at cursor position
              } catch (error) {
                console.error('Failed to handle pasted image:', error);
              }
            }
            return true;
          }
          return false;
        },
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full space-y-0 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      {uploading && (
        <div className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary text-sm">
          Uploading image...
        </div>
      )}
    </div>
  );
}
