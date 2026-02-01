"use client"

import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

import { Button } from "@/shared/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"

type ActionsCellProps<T> = {
  item: T
  onView?: (item: T) => void
  onEdit?: (item: T) => void
  onDelete: (item: T) => void
  deleteConfirmMessage?: string
}

export function ActionsCell<T>({
  item,
  onView,
  onEdit,
  onDelete,
  deleteConfirmMessage = "Вы точно хотите удалить?",
}: ActionsCellProps<T>) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = () => {
    onDelete(item)
    setDeleteOpen(false)
  }

  return (
    <div className="flex items-center gap-1">
      {onView && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-8"
          onClick={() => onView(item)}
          title="Подробнее"
        >
          <IconEye className="size-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-8"
          onClick={() => onEdit(item)}
          title="Редактировать"
        >
          <IconPencil className="size-4" />
        </Button>
      )}
      <Popover open={deleteOpen} onOpenChange={setDeleteOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-8 text-destructive hover:text-destructive"
            title="Удалить"
          >
            <IconTrash className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-56">
          <p className="text-muted-foreground text-sm">
            {deleteConfirmMessage}
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteOpen(false)}
            >
              Отмена
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Удалить
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
