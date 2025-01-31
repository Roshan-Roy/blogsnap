import Image from 'next/image'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { MdModeEditOutline } from "react-icons/md"
import Link from 'next/link'

const CardWithImage = () => {
    return (
        <Link className="block" href="#">
            <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_7px_0px_#ddd]">
                <div className="relative h-44">
                    <Image src="/user.png" alt="profile picture" fill />
                    <div className="absolute bg-gray-800 text-white font-semibold right-3 top-3 rounded-full px-5 py-2 text-[10px]">Technology</div>
                </div>
                <div className="px-6 py-4">
                    <div className="h-[116px]">
                        <h2 className="font-bold line-clamp-1 break-words">AI in marketing and job</h2>
                        <p className="text-xs font-semibold text-gray-500 py-2">26 Likes, 30 Comments</p>
                        <p className="line-clamp-3 text-sm break-words">Ubgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image src="/user.png" alt="profile picture" fill />
                            </div>
                            <div className="flex flex-col font-semibold text-xs">
                                <p>Roshan Roy</p>
                                <p className="text-gray-500">2025 May 02</p>
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

export default CardWithImage