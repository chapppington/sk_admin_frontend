"use client"

import { MiniLoader } from "@/components/ui/MiniLoader"
import { Button } from "@/shared/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { cn } from "@/shared/utils"
import { useAuthForm } from "./useAuthForm"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleSubmit, isLoading, register } = useAuthForm()

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Вход в аккаунт</h1>
          <p className="text-muted-foreground text-sm">
            Введите ваш email и пароль ниже для входа
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="mail@example.com"
            {...register("email", { required: true })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <MiniLoader /> : "Войти"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
