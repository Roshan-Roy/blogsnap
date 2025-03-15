"use client"

import { Button, Link } from '@nextui-org/react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'


const BlogPageProfile = ({
    id,
    name,
    image,
    date
}: {
    id: string;
    name: string;
    image: string | null;
    date: string;
}) => {
    const { data: session } = useSession()
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src={image ? image : "/user.png"} alt="profile picture" fill />
                </div>
                <div className="flex flex-col font-semibold text-sm gap-1">
                    <p>{name} {session?.user.id === id && "(You)"}</p>
                    <p className="text-gray-500">{date}</p>
                </div>
            </div>
            <Button as={Link} href={`/profile/${id}`} color="primary" className="bg-gray-800 font-semibold text-xs w-32" disableRipple>
                View Profile
            </Button>
        </div>
    )
}

export default BlogPageProfile