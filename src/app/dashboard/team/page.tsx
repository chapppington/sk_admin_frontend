"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useMembers } from "@/hooks/members/useMembers"
import { Button } from "@/shared/ui/button"
import type { IMember } from "@/types/members.types"
import { getMembersColumns } from "./columns"
import { MemberDialog } from "./dialog/MemberDialog"

export default function TeamPage() {
  const queryClient = useQueryClient()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null)

  const { members, pagination, isLoading, deleteMutation, patchOrderMutation } =
    useMembers({
      limit,
      offset,
      sort_field: "order",
      sort_order: 1,
    })

  const defaultOrder = pagination?.total ?? members.length

  const handleReorder = async (reordered: IMember[]) => {
    try {
      await Promise.all(
        reordered.map((member, index) =>
          patchOrderMutation.mutateAsync({
            oid: member.oid,
            order: offset + index,
          }),
        ),
      )
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Порядок обновлён")
    } catch {
      toast.error("Ошибка при обновлении порядка")
    }
  }

  const handleCreate = () => {
    setSelectedMember(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: IMember) => {
    setSelectedMember(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: IMember) => deleteMutation.mutate(item.oid)

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
        <Button onClick={handleCreate}>Добавить участника</Button>
      </div>
      <DataTable
        columns={getMembersColumns(handleEdit, handleDelete)}
        data={members}
        getRowId={(row) => row.oid}
        onReorder={handleReorder}
        getOrderForIndex={(i) => offset + i}
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
      <MemberDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        member={selectedMember}
        defaultOrder={defaultOrder}
      />
    </div>
  )
}
