import type { INews, INewsCreate } from "@/types/news.types"

export function toFormValues(news: INews | null): INewsCreate {
  if (!news) {
    return {
      category: "",
      title: "",
      content: "",
      short_content: "",
      image_url: null,
      alt: null,
      date: new Date().toISOString().slice(0, 10),
    }
  }
  return {
    category: news.category,
    title: news.title,
    content: news.content,
    short_content: news.short_content,
    image_url: news.image_url ?? null,
    alt: news.alt ?? null,
    date: news.date.slice(0, 10),
  }
}
