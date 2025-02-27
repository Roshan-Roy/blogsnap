import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"
import { FaBookmark } from "react-icons/fa6"

const BlogSaveButtonCard = ({
  blogId
}: {
  blogId: string;
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSaveBtnClick = async () => {
    setLoading(true)
    const res = await fetch(`/api/unsaveblog/${session?.user.id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        blogId
      })
    })
    if (res.ok) router.refresh()
    else setLoading(false)
  }
  return (
    <div className="border-2 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
      if (!loading) handleSaveBtnClick()
    }}>
      {loading ? <Spinner size="sm" color="default" /> : <FaBookmark />}
    </div>
  )
}

export default BlogSaveButtonCard