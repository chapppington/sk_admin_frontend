"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("bold") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor}
        >
          Жирный
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("italic") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor}
        >
          Курсив
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            editor?.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editor}
        >
          H2
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            editor?.isActive("heading", { level: 3 }) ? "default" : "outline"
          }
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editor}
        >
          H3
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor}
        >
          Список
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor}
        >
          Нумерация
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
