"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { useProducts } from "@/hooks/useProducts"
import type { IProduct, IProductCreate } from "@/types/products.types"
import { slugify } from "@/shared/utils/slugify"
import { toFormValues } from "@/app/dashboard/products/form/utils"

export type UseProductFormParams = {
  product: IProduct | null
  onOpenChange: (open: boolean) => void
}

export function useProductForm({ product, onOpenChange }: UseProductFormParams) {
  const { createMutation, updateMutation } = useProducts()
  const isEdit = Boolean(product?.oid)
  const form = useForm<IProductCreate>({
    defaultValues: toFormValues(product),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<IProductCreate> = (data) => {
    const payload: IProductCreate = {
      ...data,
      slug: slugify(data.name),
      important_characteristics: data.important_characteristics.map((c) => ({
        value: c.value,
        unit: c.unit?.text ? { text: c.unit.text } : null,
        description: c.description ?? "",
      })),
      advantages: data.advantages.map((a) => ({
        label: a.label,
        icon: a.icon,
        image: a.image || null,
        alt: a.alt || null,
        description: a.description ?? "",
      })),
      documentation:
        data.documentation?.length ? data.documentation : null,
      portfolio_ids: data.portfolio_ids.filter(Boolean),
    }
    if (isEdit && product) {
      updateMutation.mutate({ oid: product.oid, data: payload }, { onSuccess })
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    watch: form.watch,
    setValue: form.setValue,
    formState: form.formState,
    isEdit,
    isLoading,
  }
}
