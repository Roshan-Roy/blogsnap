import { Button, Link } from "@nextui-org/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"

interface Following {
    id: string;
    userId: string;
    name: string;
    email: string;
    imageUrl: string;
    loadingModal: boolean;
    enableLoading: () => void;
    disableLoading: () => void;
}

const FollowingCardMyProfile = ({
    id,
    userId,
    name,
    email,
    imageUrl,
    loadingModal,
    enableLoading,
    disableLoading,
}: Following) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleUnfollowBtnClick = async () => {
        setLoading(true)
        enableLoading()
        const res = await fetch(`/api/deletefollow/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            setLoading(false)
            disableLoading()
        }
        else router.refresh()
    }
    useEffect(() => {
        return () => {
            disableLoading()
        }
    },[])
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
                <Button onPress={() => {
                    if (!loadingModal) handleUnfollowBtnClick()
                }} variant="bordered" className="font-semibold text-xs w-32 border-gray-800" disableRipple>
                    {loading ? <Spinner size="sm" color="default" /> : "unFollow"}
                </Button>
                <Button as={Link} href={`/profile/${userId}`} color="primary" className="bg-gray-800 font-semibold text-xs w-32" disableRipple>
                    View Profile
                </Button>
            </div>
        </div>
    )
}


export default FollowingCardMyProfile
