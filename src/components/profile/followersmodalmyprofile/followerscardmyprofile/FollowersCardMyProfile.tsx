import { Button, Link } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"

interface Follower {
    id: string;
    userId: string;
    name: string;
    email: string;
    imageUrl: string;
}

const FollowersCardMyProfile = ({
    id,
    userId,
    name,
    email,
    imageUrl
}: Follower) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleDeleteBtnClick = async () => {
        setLoading(true)
        const res = await fetch(`/api/deletefollower/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) setLoading(false)
        else router.refresh()
    }
    return (
        <div className="flex justify-between items-center h-[70px]">
            <div className="flex gap-4 items-center">
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100">
                    <Image alt="profile picture" src={imageUrl ? imageUrl : "/user.png"} fill />
                </div>
                <div className="flex gap-1 flex-col">
                    <span>{name}</span>
                    <span className="text-xs text-gray-500">{email}</span>
                </div>
            </div>
            <div className="flex gap-1">
                <Button onPress={handleDeleteBtnClick} variant="bordered" className="font-semibold text-xs w-32 border-gray-800" disableRipple>
                    {loading ? <Spinner size="sm" color="default" /> : "Remove"}
                </Button>
                <Button as={Link} href={`/profile/${userId}`} color="primary" className="bg-gray-800 font-semibold text-xs w-32" disableRipple>
                    View Profile
                </Button>
            </div>
        </div>
    )
}

export default FollowersCardMyProfile