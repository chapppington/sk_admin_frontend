"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useSeoSettings } from "@/hooks/seo-settings/useSeoSettings"
import { Button } from "@/shared/ui/button"
import type { ISeoSettings } from "@/types/seo-settings.types"
import { getSeoSettingsColumns } from "./columns"
import { SeoSettingsDialog } from "./dialog/SeoSettingsDialog"

export default function SeoPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSeoSettings, setSelectedSeoSettings] =
    useState<ISeoSettings | null>(null)

  const { seoSettings, pagination, isLoading, deleteMutation } = useSeoSettings(
    {
      limit,
      offset,
      sort_field: "created_at",
      sort_order: -1,
    },
  )

  const handleCreate = () => {
    setSelectedSeoSettings(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: ISeoSettings) => {
    setSelectedSeoSettings(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: ISeoSettings) => deleteMutation.mutate(item.oid)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset)
    setLimit(newLimit)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
      <div className="flex justify-start">
        <Button onClick={handleCreate}>Добавить набор мета тегов</Button>
      </div>
      <DataTable
        columns={getSeoSettingsColumns(handleEdit, handleDelete)}
        data={seoSettings}
        serverPagination={
          pagination
            ? {
                total: pagination.total,
                offset,
                limit,
                onPageChange: handlePageChange,
              }
            : undefined
        }
      />
      <SeoSettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        seoSettings={selectedSeoSettings}
      />
    </div>
  )
}
