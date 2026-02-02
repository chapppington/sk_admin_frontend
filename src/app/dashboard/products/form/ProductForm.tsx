"use client"

import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Controller, useFieldArray } from "react-hook-form"
import { useProductForm } from "@/app/dashboard/products/form/useProductForm"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
import { FileUploader } from "@/components/FileUploader"
import { PortfolioMultiSelect } from "@/app/dashboard/products/form/PortfolioMultiSelect"
import { MiniLoader } from "@/components/ui/MiniLoader"
import type {
  IProduct,
  Documentation,
} from "@/types/products.types"
import { PRODUCT_CATEGORIES } from "@/types/products.types"
import { BUCKET_NAMES } from "@/config/buckets"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Textarea } from "@/shared/ui/textarea"

const STEPS = [
  { value: "main", label: "Основное" },
  { value: "characteristics", label: "Характеристики" },
  { value: "advantages", label: "Преимущества" },
  { value: "descriptions", label: "Описания" },
  { value: "documentation", label: "Документация" },
] as const

const MAX_SIMPLE_DESCRIPTIONS = 3

type ProductFormProps = {
  product: IProduct | null
  onOpenChange: (open: boolean) => void
}

export function ProductForm({ product, onOpenChange }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    isEdit,
    isLoading,
  } = useProductForm({ product, onOpenChange })

  const importantCharacteristicsFields = useFieldArray({
    control,
    name: "important_characteristics",
  })
  const advantagesFields = useFieldArray({ control, name: "advantages" })
  const simpleDescriptionFields = useFieldArray({
    control,
    name: "simple_description",
  })
  const detailedDescriptionFields = useFieldArray({
    control,
    name: "detailed_description",
  })
  const documentationFields = useFieldArray({
    control,
    name: "documentation",
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Tabs defaultValue={STEPS[0].value} className="w-full min-w-0">
        <TabsList className="mb-3 grid w-full grid-cols-5 h-auto p-1 gap-1">
          {STEPS.map((step) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              className="min-w-0 px-1 py-2 text-xs truncate"
            >
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="main">
          <FieldGroup>
            <Field>
              <FieldLabel>Категория</FieldLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Название</FieldLabel>
              <Input
                {...register("name", { required: true })}
                placeholder="Название продукта"
              />
            </Field>
            <Field>
              <FieldLabel>Описание</FieldLabel>
              <Textarea
                {...register("description", { required: true })}
                placeholder="Описание"
                rows={3}
              />
            </Field>
            <Field>
              <FieldLabel>Превью (изображение)</FieldLabel>
              <Controller
                name="preview_image_url"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CroppedImageUploader
                    bucketName={BUCKET_NAMES.products}
                    value={field.value}
                    onChange={(url) => field.onChange(url ?? "")}
                    aspect={4 / 3}
                  />
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Alt превью</FieldLabel>
              <Input
                {...register("preview_image_alt")}
                placeholder="Описание изображения"
              />
            </Field>
            <Field orientation="horizontal" className="items-center gap-2">
              <Controller
                name="is_shown"
                control={control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    onBlur={field.onBlur}
                    className="shrink-0"
                  />
                )}
              />
              <FieldLabel>Показывать</FieldLabel>
            </Field>
            <Field orientation="horizontal" className="items-center gap-2">
              <Controller
                name="show_advantages"
                control={control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    onBlur={field.onBlur}
                    className="shrink-0"
                  />
                )}
              />
              <FieldLabel>Показывать преимущества</FieldLabel>
            </Field>
            <Field>
              <FieldLabel>Проекты портфолио</FieldLabel>
              <Controller
                name="portfolio_ids"
                control={control}
                render={({ field }) => (
                  <PortfolioMultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Выбрать проекты"
                  />
                )}
              />
            </Field>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="characteristics">
          <FieldGroup>
            <FieldLabel>Важные характеристики</FieldLabel>
            <div className="flex flex-col gap-3">
              {importantCharacteristicsFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2 rounded border p-3"
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <Input
                      {...register(`important_characteristics.${index}.value`, {
                        required: true,
                      })}
                      placeholder="Значение"
                    />
                    <Input
                      {...register(
                        `important_characteristics.${index}.unit.text`,
                      )}
                      placeholder="Единица (например шт.)"
                    />
                    <Input
                      {...register(
                        `important_characteristics.${index}.description`,
                      )}
                      placeholder="Описание"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit text-destructive hover:text-destructive"
                    onClick={() => importantCharacteristicsFields.remove(index)}
                  >
                    <IconTrash className="size-4 mr-1" />
                    Удалить
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  importantCharacteristicsFields.append({
                    value: "",
                    unit: { text: "" },
                    description: "",
                  })
                }
              >
                <IconPlus className="size-4 mr-1" />
                Добавить характеристику
              </Button>
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="advantages">
          <FieldGroup>
            <FieldLabel>Преимущества</FieldLabel>
            <div className="flex flex-col gap-3">
              {advantagesFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2 rounded border p-3"
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Input
                      {...register(`advantages.${index}.label`, {
                        required: true,
                      })}
                      placeholder="Заголовок"
                    />
                    <Input
                      {...register(`advantages.${index}.icon`, {
                        required: true,
                      })}
                      placeholder="Иконка (название)"
                    />
                    <Field className="sm:col-span-2">
                      <FieldLabel>Изображение</FieldLabel>
                      <Controller
                        name={`advantages.${index}.image`}
                        control={control}
                        render={({ field }) => (
                          <CroppedImageUploader
                            bucketName={BUCKET_NAMES.products}
                            value={field.value ?? ""}
                            onChange={(url) => field.onChange(url ?? null)}
                            aspect={1}
                          />
                        )}
                      />
                    </Field>
                    <Input
                      {...register(`advantages.${index}.alt`)}
                      placeholder="Alt изображения"
                    />
                  </div>
                  <Textarea
                    {...register(`advantages.${index}.description`)}
                    placeholder="Описание"
                    rows={2}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit text-destructive hover:text-destructive"
                    onClick={() => advantagesFields.remove(index)}
                  >
                    <IconTrash className="size-4 mr-1" />
                    Удалить
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  advantagesFields.append({
                    label: "",
                    icon: "",
                    image: null,
                    alt: null,
                    description: "",
                  })
                }
              >
                <IconPlus className="size-4 mr-1" />
                Добавить преимущество
              </Button>
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="descriptions">
          <FieldGroup>
            <FieldLabel>Краткие описания (пункты, не более {MAX_SIMPLE_DESCRIPTIONS})</FieldLabel>
            <div className="flex flex-col gap-2 mb-4">
              {simpleDescriptionFields.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`simple_description.${index}.text`)}
                    placeholder="Текст пункта"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-destructive hover:text-destructive"
                    onClick={() => simpleDescriptionFields.remove(index)}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              ))}
              {simpleDescriptionFields.fields.length < MAX_SIMPLE_DESCRIPTIONS && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    simpleDescriptionFields.append({ text: "" })
                  }
                >
                  <IconPlus className="size-4 mr-1" />
                  Добавить пункт
                </Button>
              )}
            </div>
            <FieldLabel>Детальные описания (заголовок + текст)</FieldLabel>
            <div className="flex flex-col gap-3">
              {detailedDescriptionFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2 rounded border p-3"
                >
                  <Input
                    {...register(`detailed_description.${index}.title`, {
                      required: true,
                    })}
                    placeholder="Заголовок"
                  />
                  <Textarea
                    {...register(`detailed_description.${index}.description`, {
                      required: true,
                    })}
                    placeholder="Описание"
                    rows={2}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit text-destructive hover:text-destructive"
                    onClick={() => detailedDescriptionFields.remove(index)}
                  >
                    <IconTrash className="size-4 mr-1" />
                    Удалить
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  detailedDescriptionFields.append({
                    title: "",
                    description: "",
                  })
                }
              >
                <IconPlus className="size-4 mr-1" />
                Добавить описание
              </Button>
            </div>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="documentation">
          <FieldGroup>
            <FieldLabel>Документация</FieldLabel>
            <div className="flex flex-col gap-3">
              {documentationFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2 rounded border p-3"
                >
                  <Field>
                    <FieldLabel>Название</FieldLabel>
                    <Input
                      {...register(`documentation.${index}.title`, {
                        required: true,
                      })}
                      placeholder="Название документа"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Файл</FieldLabel>
                    <Controller
                      name={`documentation.${index}.url`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: urlField }) => (
                        <FileUploader
                          bucketName={BUCKET_NAMES.products}
                          value={urlField.value}
                          onChange={(url) => {
                            urlField.onChange(url ?? "")
                            if (url) {
                              const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? ""
                              setValue(`documentation.${index}.type`, ext)
                            }
                          }}
                          accept=".pdf,application/pdf,.doc,.docx"
                        />
                      )}
                    />
                  </Field>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit text-destructive hover:text-destructive"
                    onClick={() => documentationFields.remove(index)}
                  >
                    <IconTrash className="size-4 mr-1" />
                    Удалить
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  documentationFields.append({
                    title: "",
                    url: "",
                    type: "",
                  } as Documentation)
                }
              >
                <IconPlus className="size-4 mr-1" />
                Добавить документ
              </Button>
            </div>
          </FieldGroup>
        </TabsContent>
      </Tabs>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <MiniLoader /> : isEdit ? "Сохранить" : "Создать"}
        </Button>
      </DialogFooter>
    </form>
  )
}
