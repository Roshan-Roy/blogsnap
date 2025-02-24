"use client"

import Image from 'next/image'
import DeleteBlogModal from '@/components/deleteblogmodal/DeleteBlogModal'
import EditBlogModal from '@/components/editblogmodal/EditBlogModal'
import formatDate from '@/lib/format-date'
import { Button, Link } from '@nextui-org/react'

interface Card {
    id: string;
    title: string;
    content: string;
    topic: string;
    imageUrl: string;
    noOfComments: number;
    noOfLikes: number;
    userName: string;
    userImage?: string | null;
    dateOfCreation: Date;
}

const CardWithImage = ({
    id,
    title,
    content,
    topic,
    imageUrl,
    noOfComments,
    noOfLikes,
    userName,
    userImage,
    dateOfCreation
}: Card) => {
    return (
        <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_7px_0px_#ddd] cursor-pointer ">
            <div className="relative h-44">
                <Image src={imageUrl} alt="cover image" quality={50} fill />
                <div className="absolute bg-gray-800 text-white font-semibold right-3 top-3 rounded-full px-5 py-2 text-[10px]">{topic}</div>
            </div>
            <div className="px-6 py-4">
                <div className="h-[116px]">
                    <h2 className="font-bold line-clamp-1 break-words">{title}</h2>
                    <p className="text-xs font-semibold text-gray-500 py-2">{noOfLikes} Likes, {noOfComments} Comments</p>
                    <p className="line-clamp-3 text-sm break-words">{content}</p>
                </div>
                <Button className="my-4 text-xs font-semibold bg-gray-800 rounded-lg" href={`/blog/${id}`} color="primary" as={Link} fullWidth disableRipple>Read More</Button>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image src={userImage ? userImage : "/user.png"} alt="profile picture" fill />
                        </div>
                        <div className="flex flex-col font-semibold text-xs">
                            <p>{userName}</p>
                            <p className="text-gray-500">{formatDate(dateOfCreation)}</p>
                        </div>
                    </div>
                    <div className="flex text-xl">
                        <EditBlogModal id={id} title={title} content={content} />
                        <DeleteBlogModal id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardWithImage