"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { toFormValues } from "@/app/dashboard/products/form/utils"
import { useProducts } from "@/hooks/products/useProducts"
import { slugify } from "@/shared/utils/slugify"
import type { IProduct, IProductCreate } from "@/types/products.types"

export type UseProductFormParams = {
  product: IProduct | null
  onOpenChange: (open: boolean) => void
}

export function useProductForm({
  product,
  onOpenChange,
}: UseProductFormParams) {
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
      documentation: data.documentation?.length ? data.documentation : null,
      portfolio_ids: data.portfolio_ids.filter(Boolean),
    }
    if (isEdit && product) {
      updateMutation.mutate({ oid: product.oid, data: payload }, { onSuccess })
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  const getFirstErrorMessage = (err: unknown): string | undefined => {
    if (err && typeof err === "object") {
      if ("message" in err && typeof (err as { message?: string }).message === "string") {
        const msg = (err as { message: string }).message.trim()
        return msg || undefined
      }
      const first = Object.values(err)[0]
      return first !== undefined ? getFirstErrorMessage(first) : undefined
    }
    return undefined
  }

  const onInvalid = (errors: Record<string, unknown>) => {
    const msg = getFirstErrorMessage(errors)
    toast.error(msg || "Заполните обязательные поля")
  }

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit, onInvalid),
    control: form.control,
    watch: form.watch,
    setValue: form.setValue,
    formState: form.formState,
    isEdit,
    isLoading,
  }
}
