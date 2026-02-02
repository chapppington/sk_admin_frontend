import type { IProduct, IProductCreate } from "@/types/products.types"

export function toFormValues(product: IProduct | null): IProductCreate {
  if (!product) {
    return {
      category: "",
      name: "",
      slug: "",
      description: "",
      preview_image_url: "",
      preview_image_alt: null,
      important_characteristics: [],
      advantages: [],
      simple_description: [],
      detailed_description: [],
      documentation: [],
      order: 0,
      is_shown: true,
      show_advantages: true,
      portfolio_ids: [],
    }
  }
  return {
    category: product.category,
    name: product.name,
    slug: product.slug,
    description: product.description,
    preview_image_url: product.preview_image_url,
    preview_image_alt: product.preview_image_alt,
    important_characteristics: product.important_characteristics.map((c) => ({
      value: c.value,
      unit: c.unit ? { text: c.unit.text } : { text: "" },
      description: c.description,
    })),
    advantages: product.advantages.map((a) => ({
      label: a.label,
      icon: a.icon,
      image: a.image,
      alt: a.alt,
      description: a.description,
    })),
    simple_description: product.simple_description.map((s) => ({
      text: s.text,
    })),
    detailed_description: product.detailed_description.map((d) => ({
      title: d.title,
      description: d.description,
    })),
    documentation: product.documentation ?? [],
    order: product.order,
    is_shown: product.is_shown,
    show_advantages: product.show_advantages,
    portfolio_ids: product.portfolio_ids,
  }
}
