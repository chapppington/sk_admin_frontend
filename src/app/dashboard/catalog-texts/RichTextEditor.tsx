"use client"

import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import type { CatalogTextDocument } from "@/types/catalog-text.types"

type RichTextEditorProps = {
  initialContent: CatalogTextDocument
  saving: boolean
  onSave: (content: CatalogTextDocument) => void
}

const editorClassName = [
  "min-h-[280px] px-4 py-4 text-sm leading-7 outline-none",
  "[&_p]:mb-3",
  "[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight",
  "[&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight",
  "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5",
].join(" ")

export function RichTextEditor({
  initialContent,
  saving,
  onSave,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: editorClassName,
      },
    },
  })

  const activeStyles = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor || currentEditor.state.selection.empty) {
        return {
          bold: false,
          italic: false,
          heading2: false,
          heading3: false,
          bulletList: false,
          orderedList: false,
        }
      }

      return {
        bold: currentEditor.isActive("bold"),
        italic: currentEditor.isActive("italic"),
        heading2: currentEditor.isActive("heading", { level: 2 }),
        heading3: currentEditor.isActive("heading", { level: 3 }),
        bulletList: currentEditor.isActive("bulletList"),
        orderedList: currentEditor.isActive("orderedList"),
      }
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.bold ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor}
        >
          <Bold />
          Жирный
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.italic ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor}
        >
          <Italic />
          Курсив
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.heading2 ? "default" : "outline"}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editor}
        >
          <Heading2 />
          H2
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.heading3 ? "default" : "outline"}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editor}
        >
          <Heading3 />
          H3
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.bulletList ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor}
        >
          <List />
          Буллетированный список
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeStyles?.orderedList ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor}
        >
          <ListOrdered />
          Нумерованный список
        </Button>
      </div>

      <div className="rounded-md border bg-background">
        <EditorContent editor={editor} />
      </div>

      <div>
        <Button
          type="button"
          disabled={!editor || saving}
          onClick={() => {
            if (!editor) return
            onSave(editor.getJSON() as CatalogTextDocument)
          }}
        >
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  )
}
