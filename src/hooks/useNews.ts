import { useQuery } from "@tanstack/react-query"
import newsService from "@/services/news/news.service"
import type { INewsListParams } from "@/shared/types/news.types"

export function useNews(params?: INewsListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", params],
    queryFn: () => newsService.fetchNews(params),
  })

  return {
    news: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}
