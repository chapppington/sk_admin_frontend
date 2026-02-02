"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useCertificateGroups } from "@/hooks/certificates/useCertificateGroups"
import { useCertificates } from "@/hooks/certificates/useCertificates"
import { Button } from "@/shared/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import type {
  ICertificate,
  ICertificateGroup,
} from "@/types/certificates.types"
import { CERTIFICATE_SECTIONS } from "@/types/certificates.types"
import { getCertificatesColumns } from "./columns/certificates-columns"
import { getCertificateGroupsColumns } from "./columns/groups-columns"
import { CertificateDialog } from "./dialog/CertificateDialog"
import { CertificateGroupDialog } from "./dialog/CertificateGroupDialog"

export default function CertificatesPage() {
  const queryClient = useQueryClient()
  const [section, setSection] = useState<string>(CERTIFICATE_SECTIONS[0])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<ICertificateGroup | null>(
    null,
  )
  const [selectedGroupForCertificates, setSelectedGroupForCertificates] =
    useState<ICertificateGroup | null>(null)
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<ICertificate | null>(null)

  const {
    certificateGroups,
    pagination,
    isLoading,
    patchOrderMutation: patchGroupOrderMutation,
    deleteMutation: deleteGroupMutation,
  } = useCertificateGroups({
    limit,
    offset,
    section,
    sort_field: "order",
    sort_order: 1,
  })

  const {
    certificates,
    isLoading: certificatesLoading,
    patchOrderMutation: patchCertificateOrderMutation,
    deleteMutation: deleteCertificateMutation,
  } = useCertificates(
    selectedGroupForCertificates
      ? {
          certificate_group_id: selectedGroupForCertificates.oid,
          limit: 100,
          sort_field: "order",
          sort_order: 1,
        }
      : undefined,
  )

  const handleCreateGroup = () => {
    setSelectedGroup(null)
    setGroupDialogOpen(true)
  }

  const handleEditGroup = (group: ICertificateGroup) => {
    setSelectedGroup(group)
    setGroupDialogOpen(true)
  }

  const handleDeleteGroup = (group: ICertificateGroup) =>
    deleteGroupMutation.mutate(group.oid)

  const handleViewCertificates = (group: ICertificateGroup) => {
    setSelectedGroupForCertificates(group)
  }

  const handleCreateCertificate = () => {
    setSelectedCertificate(null)
    setCertificateDialogOpen(true)
  }

  const handleEditCertificate = (certificate: ICertificate) => {
    setSelectedCertificate(certificate)
    setCertificateDialogOpen(true)
  }

  const handleDeleteCertificate = (certificate: ICertificate) =>
    deleteCertificateMutation.mutate(certificate.oid)

  const handleReorderCertificates = async (reordered: ICertificate[]) => {
    try {
      await Promise.all(
        reordered.map((cert, index) =>
          patchCertificateOrderMutation.mutateAsync({
            oid: cert.oid,
            order: index,
          }),
        ),
      )
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Порядок обновлён")
    } catch {
      toast.error("Ошибка при обновлении порядка")
    }
  }

  const handleReorderGroups = async (reordered: ICertificateGroup[]) => {
    try {
      await Promise.all(
        reordered.map((group, index) =>
          patchGroupOrderMutation.mutateAsync({
            oid: group.oid,
            order: offset + index,
          }),
        ),
      )
      queryClient.invalidateQueries({ queryKey: ["certificate-groups"] })
      toast.success("Порядок обновлён")
    } catch {
      toast.error("Ошибка при обновлении порядка")
    }
  }

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset)
    setLimit(newLimit)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Выберите секцию" />
            </SelectTrigger>
            <SelectContent>
              {CERTIFICATE_SECTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!selectedGroupForCertificates && (
            <Button onClick={handleCreateGroup} className="w-full md:w-auto">
              Добавить группу
            </Button>
          )}
        </div>

        {selectedGroupForCertificates ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCertificateDialogOpen(false)
                  setSelectedCertificate(null)
                  setSelectedGroupForCertificates(null)
                }}
              >
                ← Назад к группам
              </Button>
              <span className="text-muted-foreground">
                Сертификаты группы: {selectedGroupForCertificates.title}
              </span>
            </div>
            <div className="flex justify-start">
              <Button onClick={handleCreateCertificate}>
                Добавить сертификат
              </Button>
            </div>
            {certificatesLoading ? (
              <MiniLoader />
            ) : (
              <DataTable
                columns={getCertificatesColumns(
                  handleEditCertificate,
                  handleDeleteCertificate,
                )}
                data={certificates}
                getRowId={(row) => row.oid}
                onReorder={handleReorderCertificates}
                getOrderForIndex={(i) => i}
              />
            )}
          </div>
        ) : (
          <DataTable
            columns={getCertificateGroupsColumns(
              handleEditGroup,
              handleDeleteGroup,
              handleViewCertificates,
            )}
            data={certificateGroups}
            getRowId={(row) => row.oid}
            onReorder={handleReorderGroups}
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
        )}
      </div>

      <CertificateGroupDialog
        open={groupDialogOpen}
        onOpenChange={setGroupDialogOpen}
        group={selectedGroup}
      />

      {selectedGroupForCertificates && (
        <CertificateDialog
          open={certificateDialogOpen}
          onOpenChange={setCertificateDialogOpen}
          certificateGroupId={selectedGroupForCertificates.oid}
          certificate={selectedCertificate}
        />
      )}
    </div>
  )
}
