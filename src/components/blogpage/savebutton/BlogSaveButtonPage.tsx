"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"
import { FaRegBookmark } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa6"

const BlogSaveButton = ({
  blogId,
  initialSaved,
}: {
  blogId: string;
  initialSaved: boolean;
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(initialSaved)

  const handleSaveBtnClick = async () => {
    setLoading(true)
    if (saved) {
      const res = await fetch(`/api/unsaveblog/${session?.user.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          blogId
        })
      })
      if (res.ok) {
        setSaved(false)
        router.refresh()
      }
    } else {
      const res = await fetch(`/api/saveblog/${session?.user.id}`, {
        method: 'POST',
        body: JSON.stringify({
          blogId
        })
      })
      if (res.ok) {
        setSaved(true)
        router.refresh()
      }
    }
    setLoading(false)
  }
  return (
    <div className="border-2 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
      if (!loading) handleSaveBtnClick()
    }}>
      {loading ? <Spinner size="sm" color="default" /> : saved ? <FaBookmark /> : <FaRegBookmark />}
    </div>
  )
}

export default BlogSaveButton