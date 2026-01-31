const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]

export interface ServerPaginationConfig {
  total: number
  offset: number
  limit: number
  onPageChange: (offset: number, limit: number) => void
  pageSizeOptions?: number[]
}

export function useServerPagination(
  config: ServerPaginationConfig | undefined,
) {
  const pageSizeOptions = config?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS
  const pageCount =
    config && config.limit > 0 ? Math.ceil(config.total / config.limit) || 1 : 1
  const pageIndex =
    config && config.limit > 0 ? Math.floor(config.offset / config.limit) : 0
  const canPrev = pageIndex > 0
  const canNext = config ? config.offset + config.limit < config.total : false

  const goToFirstPage = () => {
    config?.onPageChange(0, config.limit)
  }
  const goToPrevPage = () => {
    if (!config) return
    const newOffset = Math.max(0, config.offset - config.limit)
    config.onPageChange(newOffset, config.limit)
  }
  const goToNextPage = () => {
    if (!config) return
    config.onPageChange(config.offset + config.limit, config.limit)
  }
  const goToLastPage = () => {
    if (!config) return
    const lastOffset = (pageCount - 1) * config.limit
    config.onPageChange(lastOffset, config.limit)
  }
  const changePageSize = (value: string) => {
    if (!config) return
    config.onPageChange(0, Number(value))
  }

  return {
    pageSizeOptions,
    pageCount,
    pageIndex,
    canPrev,
    canNext,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    changePageSize,
    limit: config?.limit,
    isEnabled: Boolean(config),
  }
}
