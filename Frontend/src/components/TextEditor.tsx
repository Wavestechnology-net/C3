import { useEditor, EditorContent, useEditorState, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from "@tiptap/extension-text-align"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading3,
  Heading4,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import Heading from '@tiptap/extension-heading';
import { useEffect } from 'react';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        bulletList: false,
        orderedList: false,
        heading: false
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
          class: "wysiwyg-heading"
        }
      }),
      Link.configure({
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline hover:underline cursor-pointer'
        }
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-6',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-6',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.commands.focus();
      }, 0);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input rounded-md">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="max-w-none min-h-[200px] max-h-80 overflow-y-scroll p-4 focus:outline-none"
      />
    </div>
  );
};

function Toolbar({ editor }: { editor: Editor }) {

  const {
    isBold,
    canBold,
    isItalic,
    canItalic,
    isHeading1,
    isHeading2,
    isHeading3,
    isHeading4,
    isBulletList,
    isOrderedList,
    isLink,
    isAlignLeft,
    isAlignCenter,
    isAlignRight,
    isAlignJustify,
  } = useEditorState({
    editor,
    selector: snapshot => ({
      currentSelection: snapshot.editor.state.selection,
      isBold: snapshot.editor.isActive('bold') ?? false,
      canBold: snapshot.editor.can().toggleBold(),
      isItalic: snapshot.editor.isActive('italic'),
      canItalic: snapshot.editor.can().toggleItalic(),
      isHeading1: snapshot.editor.isActive('heading', { level: 1 }),
      isHeading2: snapshot.editor.isActive('heading', { level: 2 }),
      isHeading3: snapshot.editor.isActive('heading', { level: 3 }),
      isHeading4: snapshot.editor.isActive('heading', { level: 4 }),
      isBulletList: snapshot.editor.isActive('bulletList'),
      isOrderedList: snapshot.editor.isActive('orderedList'),
      isLink: snapshot.editor.isActive('link'),
      isAlignLeft: snapshot.editor.isActive({ textAlign: 'left' }) || !snapshot.editor.isActive({ textAlign: /^(center|right|justify)$/ }),
      isAlignCenter: snapshot.editor.isActive({ textAlign: 'center' }),
      isAlignRight: snapshot.editor.isActive({ textAlign: 'right' }),
      isAlignJustify: snapshot.editor.isActive({ textAlign: 'justify' }),
    }),
  })

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-input bg-muted list">
      <Toggle
        size="sm"
        variant={isBold ? "outline" : "default"}
        disabled={!canBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isItalic ? "outline" : "default"}
        disabled={!canItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isHeading1 ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isHeading2 ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isHeading3 ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isHeading4 ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isBulletList ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isOrderedList ? "outline" : "default"}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        variant={isLink ? "outline" : "default"}
        onPressedChange={() => {
          if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt('Enter URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        variant={isAlignLeft ? "outline" : "default"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('left').run()
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        variant={isAlignCenter ? "outline" : "default"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('center').run()
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        variant={isAlignRight ? "outline" : "default"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('right').run()
        }
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        variant={isAlignJustify ? "outline" : "default"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('justify').run()
        }
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>

      {/* Image Insert Button */}
      {/* <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Toggle size="sm">
              <ImageIcon className="h-4 w-4" />
            </Toggle>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ScrollArea className="flex-1">
              {filteredMedia.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
                  {filteredMedia.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => insertImage(m.mediaUrl, m.altText)}
                      className="group relative rounded-lg border border-border overflow-hidden hover:border-primary transition-colors"
                    >
                      <div className="aspect-square">
                        <img
                          src={m.mediaUrl}
                          alt={m.altText || `Image ${m.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate">
                          {m.altText || m.fileName}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog> */}
    </div>
  )
}