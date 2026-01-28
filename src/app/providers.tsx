"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type PropsWithChildren, useState } from "react"
import { ThemeProvider } from "@/context/ThemeProvider"
import { Toaster } from "@/shared/ui/sonner"

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
