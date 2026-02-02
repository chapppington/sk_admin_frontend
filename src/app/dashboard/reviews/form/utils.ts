import type { IReview, IReviewCreate } from "@/types/reviews.types"
import { REVIEW_CATEGORIES } from "@/types/reviews.types"

export function toFormValues(review: IReview | null): IReviewCreate {
  if (!review) {
    return {
      name: "",
      category: REVIEW_CATEGORIES[0],
      position: null,
      image: null,
      text: null,
      short_text: null,
      content_url: null,
    }
  }
  return {
    name: review.name,
    category: review.category,
    position: review.position ?? null,
    image: review.image ?? null,
    text: review.text ?? null,
    short_text: review.short_text ?? null,
    content_url: review.content_url ?? null,
  }
}
