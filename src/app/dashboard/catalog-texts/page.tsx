"use client"

import { useState } from "react"
import { RichTextEditor } from "@/app/dashboard/catalog-texts/RichTextEditor"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useCatalogTexts } from "@/hooks/catalog-texts/useCatalogTexts"
import { Button } from "@/shared/ui/button"
import {
  CATALOG_CATEGORIES,
  type CatalogCategoryKey,
  type CatalogTextDocument,
} from "@/types/catalog-text.types"

const EMPTY_DOCUMENT: CatalogTextDocument = {
  type: "doc",
  content: [{ type: "paragraph" }],
}

export default function CatalogTextsPage() {
  const [category, setCategory] = useState<CatalogCategoryKey>(
    CATALOG_CATEGORIES[0].key,
  )
  const { texts, isLoading, upsertMutation } = useCatalogTexts()
  const saved = texts.find((item) => item.category === category)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <p className="max-w-3xl text-sm text-muted-foreground">
        Текст выводится под сеткой товаров на странице выбранной категории.
        Доступны абзацы, заголовки H2 и H3, списки, жирный и курсив.
      </p>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-80 lg:shrink-0">
          {CATALOG_CATEGORIES.map((item) => (
            <Button
              key={item.key}
              type="button"
              variant={item.key === category ? "default" : "outline"}
              className="h-auto justify-start whitespace-normal py-2 text-left"
              onClick={() => setCategory(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <RichTextEditor
            key={category}
            initialContent={saved?.content ?? EMPTY_DOCUMENT}
            saving={upsertMutation.isPending}
            onSave={(content) => upsertMutation.mutate({ category, content })}
          />
        </div>
      </div>
    </div>
  )
}
