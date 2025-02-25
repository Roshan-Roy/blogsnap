import Image from "next/image"
import { useSession } from "next-auth/react"
import { MdDeleteOutline } from "react-icons/md"

const CommentCard = ({
    userId,
    name,
    image,
    createdAt,
    comment
}: {
    userId: string;
    name: string;
    image: string;
    createdAt: string;
    comment: string;
}) => {
    const { data: session } = useSession()
    return (
        <div className="flex gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                <Image src={image} alt="profile picture" fill />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex flex-col font-semibold text-xs">
                        <p>{name} {session?.user.id === userId && "(You)"}</p>
                        <p className="text-gray-500">{createdAt}</p>
                    </div>
                    {session?.user.id === userId &&
                        <span className="cursor-pointer">
                            <MdDeleteOutline className="text-lg text-gray-600" />
                        </span>
                    }
                </div>
                <p className="text-sm pt-1 pb-2">{comment}</p>
            </div>
        </div>
    )
}

export default CommentCard