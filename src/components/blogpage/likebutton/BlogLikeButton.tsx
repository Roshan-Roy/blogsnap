"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"
import { FaRegHeart, FaHeart } from "react-icons/fa"

const BlogLikeButton = ({
    blogId,
    initialLiked,
    initialNoOfLikes
}: {
    blogId: string;
    initialLiked: boolean;
    initialNoOfLikes: number;
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(initialLiked)
    const [noOfLikes, setNoOfLikes] = useState(initialNoOfLikes)

    const handleLikeBtnClick = async () => {
        setLoading(true)
        if (liked) {
            const res = await fetch(`/api/dislikeblog/${session?.user.id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    blogId
                })
            })
            if (res.ok) {
                setLiked(false)
                setNoOfLikes(e => e -= 1)
                router.refresh()
            }
        } else {
            const res = await fetch(`/api/likeblog/${session?.user.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    blogId
                })
            })
            if (res.ok) {
                setLiked(true)
                setNoOfLikes(e => e += 1)
                router.refresh()
            }
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
            if (!loading) handleLikeBtnClick()
        }}>
            <div className="border-2 w-10 h-10 rounded-full flex justify-center items-center">
                {loading ? <Spinner size="sm" color="default" /> : liked ? <FaHeart className="text-red-600"/> : <FaRegHeart />}
            </div>
            <span className="text-sm font-semibold">{noOfLikes}</span>
        </div>
    )
}

export default BlogLikeButton