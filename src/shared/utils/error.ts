export function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (
      err as {
        response?: {
          data?: { message?: string; errors?: Array<{ message?: string }> }
        }
      }
    ).response
    const data = res?.data
    const fromErrors = data?.errors?.[0]?.message
    return fromErrors ?? data?.message ?? fallback
  }
  return fallback
}
