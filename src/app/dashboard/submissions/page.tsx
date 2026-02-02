"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useSubmissions } from "@/hooks/useSubmissions"
import type { ISubmission } from "@/types/submissions.types"
import { getSubmissionsColumns } from "./columns"
import { SubmissionDetailDialog } from "./dialog/SubmissionDetailDialog"

export default function SubmissionsPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] =
    useState<ISubmission | null>(null)

  const { submissions, pagination, isLoading, deleteMutation } = useSubmissions(
    {
      limit,
      offset,
      sort_field: "created_at",
      sort_order: -1,
    },
  )

  const handleView = (item: ISubmission) => {
    setSelectedSubmission(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: ISubmission) => deleteMutation.mutate(item.oid)

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
      <DataTable
        columns={getSubmissionsColumns(handleView, handleDelete)}
        data={submissions}
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
      <SubmissionDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        submission={selectedSubmission}
      />
    </div>
  )
}
