"use client"

import type { ISubmission } from "@/types/submissions.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { formatDateTime } from "@/shared/utils/date"

type SubmissionDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: ISubmission | null
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-1 text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="wrap-break-word">{value ?? "—"}</span>
    </div>
  )
}

export function SubmissionDetailDialog({
  open,
  onOpenChange,
  submission,
}: SubmissionDetailDialogProps) {
  if (!submission) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Подробнее</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-2">
          <DetailRow label="ID" value={submission.oid} />
          <DetailRow label="Тип формы" value={submission.form_type} />
          <DetailRow label="Имя" value={submission.name} />
          <DetailRow label="Email" value={submission.email} />
          <DetailRow label="Телефон" value={submission.phone} />
          <DetailRow label="Комментарий" value={submission.comments} />
          <DetailRow
            label="Файлы"
            value={
              submission.files.length > 0 ? (
                <ul className="list-inside list-disc space-y-1">
                  {submission.files.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:no-underline"
                      >
                        Файл {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "—"
              )
            }
          />
          <DetailRow
            label="Файл ответов"
            value={
              submission.answers_file_url ? (
                <a
                  href={submission.answers_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  Скачать
                </a>
              ) : (
                "—"
              )
            }
          />
          <DetailRow label="Дата создания" value={formatDateTime(submission.created_at)} />
          <DetailRow label="Дата обновления" value={formatDateTime(submission.updated_at)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
