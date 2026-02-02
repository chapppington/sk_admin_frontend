"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { usePortfolios } from "@/hooks/usePortfolios"
import { Button } from "@/shared/ui/button"
import type { IPortfolio } from "@/types/portfolios.types"
import { getPortfoliosColumns } from "./columns"
import { PortfolioDialog } from "./dialog/PortfolioDialog"

export default function PortfolioPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState<IPortfolio | null>(
    null,
  )

  const { portfolios, pagination, isLoading, deleteMutation } = usePortfolios({
    limit,
    offset,
    sort_field: "created_at",
    sort_order: -1,
  })

  const handleCreate = () => {
    setSelectedPortfolio(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: IPortfolio) => {
    setSelectedPortfolio(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: IPortfolio) => deleteMutation.mutate(item.oid)

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
        <Button onClick={handleCreate}>Добавить проект</Button>
      </div>
      <DataTable
        columns={getPortfoliosColumns(handleEdit, handleDelete)}
        data={portfolios}
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
      <PortfolioDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        portfolio={selectedPortfolio}
      />
    </div>
  )
}
