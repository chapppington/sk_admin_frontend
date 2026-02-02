"use client"

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconGripVertical } from "@tabler/icons-react"
import { type Row, flexRender } from "@tanstack/react-table"
import { useCallback, useMemo } from "react"
import { TableCell, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"

export function DragHandle({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners } = useSortable({ id })

  return (
    <Button
      {...attributes}
      {...listeners}
      type="button"
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-8 shrink-0 cursor-grab active:cursor-grabbing hover:bg-transparent"
    >
      <IconGripVertical className="size-4" />
      <span className="sr-only">Перетащить</span>
    </Button>
  )
}

export function SortableTableRow<TData>({ row }: { row: Row<TData> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export interface UseDataTableDndParams<TData> {
  localData: TData[]
  getRowId: (row: TData) => string
  getOrderForIndex?: (index: number) => number
  onReorder?: (reorderedData: TData[]) => void
  setLocalData: (data: TData[] | ((prev: TData[]) => TData[])) => void
  setSkipNextSync: () => void
}

export function useDataTableDnd<TData>({
  localData,
  getRowId,
  getOrderForIndex,
  onReorder,
  setLocalData,
  setSkipNextSync,
}: UseDataTableDndParams<TData>) {
  const rowIds = useMemo<UniqueIdentifier[]>(
    () => localData.map((row) => getRowId(row)),
    [localData, getRowId],
  )

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor),
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const oldIndex = rowIds.indexOf(active.id)
      const newIndex = rowIds.indexOf(over.id)
      if (oldIndex === -1 || newIndex === -1) return
      const reordered = arrayMove(localData, oldIndex, newIndex)
      const newData =
        getOrderForIndex && reordered.length > 0 && "order" in (reordered[0] as object)
          ? (reordered.map((item, i) => ({
              ...(item as object),
              order: getOrderForIndex(i),
            })) as TData[])
          : reordered
      setLocalData(newData)
      setSkipNextSync()
      onReorder?.(newData)
    },
    [
      localData,
      rowIds,
      getOrderForIndex,
      onReorder,
      setLocalData,
      setSkipNextSync,
    ],
  )

  return { rowIds, sensors, handleDragEnd }
}

type DataTableDndContextProps = {
  rowIds: UniqueIdentifier[]
  sensors: ReturnType<typeof useSensors>
  onDragEnd: (event: DragEndEvent) => void
  children: React.ReactNode
}

export function DataTableDndContext({
  rowIds,
  sensors,
  onDragEnd,
  children,
}: DataTableDndContextProps) {
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        key={rowIds.join(",")}
        items={rowIds}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
