import { Button, Link } from "@nextui-org/react"
import Image from "next/image"
import { useSession } from "next-auth/react";

interface Following {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
}

const FollowingCard = ({
    id,
    name,
    email,
    imageUrl
}: Following) => {
    const { data: session } = useSession()
    return (
        <div className="flex justify-between items-center h-[70px]">
            <div className="flex gap-4 items-center">
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100">
                    <Image alt="profile picture" src={imageUrl ? imageUrl : "/user.png"} fill />
                </div>
                <div className="flex gap-1 flex-col">
                    <span>{name} {session?.user.id === id && "(You)"}</span>
                    <span className="text-xs text-gray-500">{email}</span>
                </div>
            </div>
            <Button as={Link} href={`/profile/${id}`} color="primary" className="bg-gray-800 font-semibold text-xs w-32" disableRipple>
                View Profile
            </Button>
        </div>
    )
}

export default FollowingCard