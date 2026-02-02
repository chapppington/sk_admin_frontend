"use client"

import { useMemo, useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { useDebounce } from "@/hooks/useDebounce"
import { usePortfolios } from "@/hooks/usePortfolios"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/utils"

const PORTFOLIOS_FETCH_LIMIT = 500

type PortfolioMultiSelectProps = {
  value: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PortfolioMultiSelect({
  value,
  onChange,
  placeholder = "Выбрать проекты",
  disabled,
  className,
}: PortfolioMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  const { portfolios, isLoading } = usePortfolios({
    limit: PORTFOLIOS_FETCH_LIMIT,
    offset: 0,
  })

  const filteredPortfolios = useMemo(() => {
    if (!debouncedSearch.trim()) return portfolios
    const q = debouncedSearch.trim().toLowerCase()
    return portfolios.filter((p) => p.name.toLowerCase().includes(q))
  }, [portfolios, debouncedSearch])

  const toggle = (oid: string) => {
    if (value.includes(oid)) {
      onChange(value.filter((id) => id !== oid))
    } else {
      onChange([...value, oid])
    }
  }

  const label =
    value.length > 0
      ? `${value.length} проект${value.length === 1 ? "" : value.length < 5 ? "а" : "ов"}`
      : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal h-auto min-h-9 py-2",
            className,
          )}
        >
          <span className="truncate">{label}</span>
          <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
            autoFocus
          />
        </div>
        <div className="max-h-[280px] overflow-y-auto p-1">
          {isLoading ? (
            <div className="py-4 text-center text-muted-foreground text-sm">
              Загрузка...
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground text-sm">
              {debouncedSearch ? "Ничего не найдено" : "Нет проектов"}
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {filteredPortfolios.map((portfolio) => (
                <label
                  key={portfolio.oid}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer hover:bg-accent"
                >
                  <Checkbox
                    checked={value.includes(portfolio.oid)}
                    onCheckedChange={() => toggle(portfolio.oid)}
                  />
                  <span className="truncate text-sm">{portfolio.name}</span>
                  {portfolio.year && (
                    <span className="text-muted-foreground text-xs shrink-0">
                      {portfolio.year}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
