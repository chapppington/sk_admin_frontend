"use client"

import { PortfolioForm } from "@/app/dashboard/portfolio/form/PortfolioForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { IPortfolio } from "@/types/portfolios.types"

type PortfolioDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  portfolio: IPortfolio | null
}

export function PortfolioDialog({
  open,
  onOpenChange,
  portfolio,
}: PortfolioDialogProps) {
  const isEdit = Boolean(portfolio?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать проект" : "Создать проект"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <PortfolioForm portfolio={portfolio} onOpenChange={onOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
