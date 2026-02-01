import type { IPortfolio, IPortfolioCreate } from "@/types/portfolios.types"

export function toFormValues(portfolio: IPortfolio | null): IPortfolioCreate {
  if (!portfolio) {
    return {
      name: "",
      slug: "",
      poster: "",
      poster_alt: "",
      year: new Date().getFullYear(),
      task_title: "",
      task_description: "",
      solution_title: "",
      solution_description: "",
      solution_subtitle: "",
      solution_subdescription: "",
      solution_image_left: "",
      solution_image_left_alt: "",
      solution_image_right: "",
      solution_image_right_alt: "",
      description: "",
      has_review: false,
      review_title: null,
      review_text: null,
      review_name: null,
      review_image: null,
      review_role: null,
    }
  }
  return {
    name: portfolio.name,
    slug: portfolio.slug,
    poster: portfolio.poster,
    poster_alt: portfolio.poster_alt,
    year: portfolio.year,
    task_title: portfolio.task_title,
    task_description: portfolio.task_description,
    solution_title: portfolio.solution_title,
    solution_description: portfolio.solution_description,
    solution_subtitle: portfolio.solution_subtitle,
    solution_subdescription: portfolio.solution_subdescription,
    solution_image_left: portfolio.solution_image_left,
    solution_image_left_alt: portfolio.solution_image_left_alt,
    solution_image_right: portfolio.solution_image_right,
    solution_image_right_alt: portfolio.solution_image_right_alt,
    description: portfolio.description,
    has_review: portfolio.has_review,
    review_title: portfolio.review_title ?? null,
    review_text: portfolio.review_text ?? null,
    review_name: portfolio.review_name ?? null,
    review_image: portfolio.review_image ?? null,
    review_role: portfolio.review_role ?? null,
  }
}
