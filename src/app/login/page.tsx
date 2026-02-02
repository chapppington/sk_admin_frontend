import type { Metadata } from "next"
import Image from "next/image"
import { LoginForm } from "@/app/login/form/LoginForm"
import { ThemeLogo } from "@/components/ui/ThemeLogo"

export const metadata: Metadata = {
  title: "Вход",
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <ThemeLogo />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          sizes="(max-width: 640px) 100vw, 600px"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  )
}
