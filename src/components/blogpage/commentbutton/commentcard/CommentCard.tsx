import Image from "next/image"
import { useSession } from "next-auth/react"
import { MdDeleteOutline } from "react-icons/md"
import { useEffect, useState } from "react"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"

const CommentCard = ({
    id,
    userId,
    name,
    image,
    createdAt,
    comment,
    activateError,
    deactivateError,
    activateDeleteLoading,
    deactivateDeleteLoading,
    deleteLoading
}: {
    id: string;
    userId: string;
    name: string;
    image: string;
    createdAt: string;
    comment: string;
    deleteLoading: boolean;
    activateError: () => void;
    deactivateError: () => void;
    activateDeleteLoading: () => void;
    deactivateDeleteLoading: () => void;
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const handleDeleteBtnClick = async () => {
        setLoading(true)
        activateDeleteLoading()
        deactivateError()
        try {
            const res = await fetch(`/api/deletecomment/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error()
            router.refresh()
        } catch {
            activateError()
            deactivateDeleteLoading()
            setLoading(false)
        }
    }
    useEffect(() => {
        return () => deactivateDeleteLoading()
    }, [])
    return (
        <div className="flex gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                <Image src={image ? image : "/user.png"} alt="profile picture" fill />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex flex-col font-semibold text-xs">
                        <p>{name} {session?.user.id === userId && "(You)"}</p>
                        <p className="text-gray-500">{createdAt}</p>
                    </div>
                    {session?.user.id === userId &&
                        (loading ? <Spinner size="sm" color="default" className="self-start" /> : <span onClick={() => {
                            if (!deleteLoading) handleDeleteBtnClick()
                        }} className="cursor-pointer">
                            <MdDeleteOutline className="text-lg text-gray-600" />
                        </span>)
                    }
                </div>
                <p className="text-sm pt-1 pb-2 break-all">{comment}</p>
            </div>
        </div>
    )
}

export default CommentCard