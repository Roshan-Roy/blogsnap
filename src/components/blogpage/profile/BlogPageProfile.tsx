"use client"

import { Button } from '@nextui-org/react'
import Image from 'next/image'

const BlogPageProfile = ({
    name,
    image,
    date
}: {
    name: string;
    image: string | null;
    date: string;
}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src={image ? image : "/user.png"} alt="profile picture" fill />
                </div>
                <div className="flex flex-col font-semibold text-sm gap-1">
                    <p>{name}</p>
                    <p className="text-gray-500">{date}</p>
                </div>
            </div>
            <Button color="primary" className="bg-gray-800 font-semibold text-xs w-24" disableRipple>
                Follow
            </Button>
        </div>
    )
}

export default BlogPageProfile