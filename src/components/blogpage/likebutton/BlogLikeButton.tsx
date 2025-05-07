"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/react"
import { useState } from "react"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import LikedUsersCard from "./likeduserscard/LikedUsersCard"

interface likedUsers {
    id: string;
    name: string;
    email: string;
    image: string;
}

const BlogLikeButton = ({
    blogId,
    initialLiked,
    likedUsers
}: {
    blogId: string;
    initialLiked: boolean;
    likedUsers: likedUsers[];
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(initialLiked)

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
                router.refresh()
            }
        }
        setLoading(false)
    }
    return (
        <div className="flex items-center">
            <div className="border-2 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={(e) => {
                if (!loading) handleLikeBtnClick()
            }}>
                {loading ? <Spinner size="sm" color="default" /> : liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
            </div>
            <span onClick={onOpen} className="text-sm font-semibold p-2 rounded-full cursor-pointer">{likedUsers.length}</span>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" radius="sm" size="lg">
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{likedUsers.length} {likedUsers.length <= 1 ? "Like" : "Likes"}</ModalHeader>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                        <div className="h-[420px]">
                            {likedUsers.length === 0 && <div className="h-[370px] flex justify-center items-center text-lg"><span>No likes</span></div>}
                            {likedUsers.map(e => <LikedUsersCard key={e.id} {...e} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default BlogLikeButton