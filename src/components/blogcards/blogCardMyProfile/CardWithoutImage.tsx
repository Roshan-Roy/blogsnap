import Image from 'next/image'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { MdModeEditOutline } from "react-icons/md"
import Link from 'next/link'
import formatDate from '@/lib/format-date'

interface Card {
    title: string;
    content: string;
    topic: string;
    noOfComments: number;
    noOfLikes: number;
    userName: string;
    userImage?: string | null;
    dateOfCreation: Date;
}

const CardWithoutImage = ({
    title,
    content,
    topic,
    noOfComments,
    noOfLikes,
    userName,
    userImage,
    dateOfCreation
}: Card) => {
    return (
        <Link className="block" href="#">
            <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_7px_0px_#ddd] h-[380px]">
                <div className="flex justify-end pt-3 pr-3">
                    <div className="bg-gray-800 text-white font-semibold right-3 top-3 rounded-full px-5 py-2 text-[10px]">{topic}</div>
                </div>
                <div className="px-6 py-4 h-[337px] flex flex-col justify-between">
                    <div>
                        <h2 className="font-bold line-clamp-1 break-words">{title}</h2>
                        <p className="text-xs font-semibold text-gray-500 py-2">{noOfLikes} Likes, {noOfComments} Comments</p>
                        <p className="overflow-hidden text-ellipsis break-words text-sm" style={{ display: "-webkit-box", WebkitLineClamp: 9, WebkitBoxOrient: "vertical" }}>{content}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4">
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
                            <div className="p-2 hover:bg-gray-200 rounded-full">
                                <MdModeEditOutline className="cursor-pointer" />
                            </div>
                            <div className="p-2 hover:bg-gray-200 rounded-full">
                                <MdDeleteOutline className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardWithoutImage