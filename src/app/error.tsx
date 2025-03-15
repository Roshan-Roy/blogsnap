"use client"

import { startTransition } from "react"
import { useRouter } from "next/navigation"

const Error = ({
  error,
  reset
}: {
  error: Error;
  reset: () => void
}) => {
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={() => reload()}>Try again</button>
    </div>
  )
}

export default Error