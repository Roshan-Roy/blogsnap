"use client"

import { startTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import { MdErrorOutline } from "react-icons/md"

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
    <div className="h-[calc(100dvh-80px)] flex justify-center items-center">
      <div className="flex flex-col gap-6 items-center">
        <MdErrorOutline className="text-6xl" />
        <p className="text-xl">{error.message}</p>
        <Button onPress={() => reload()} className="bg-gray-800 rounded-lg text-white px-10">Try again</Button>
      </div>
    </div>
  )
}

export default Error