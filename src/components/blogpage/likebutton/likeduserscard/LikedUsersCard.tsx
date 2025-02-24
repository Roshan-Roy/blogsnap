import { Button, Link } from "@nextui-org/react"
import Image from "next/image"

const LikedUsersCard = ({
    id,
    name,
    email,
    image
}: {
    id: string;
    name: string;
    email: string;
    image: string;
}) => {
    return (
        <div className="flex justify-between items-center h-[70px]">
            <div className="flex gap-4 items-center">
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100">
                    <Image alt="profile picture" src={image ? image : "/user.png"} fill />
                </div>
                <div className="flex gap-1 flex-col">
                    <span>{name}</span>
                    <span className="text-xs text-gray-500">{email}</span>
                </div>
            </div>
            <Button as={Link} color="primary" className="bg-gray-800 font-semibold text-xs w-32" disableRipple>
                View Profile
            </Button>
        </div>
    )
}

export default LikedUsersCard