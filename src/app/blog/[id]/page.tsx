import React from 'react'
import { db } from '@/lib/db'
import BlogPageProfile from '@/components/blogpage/profile/BlogPageProfile'
import formatDate from '@/lib/format-date'
import Image from 'next/image'
import { FaRegComment, FaRegBookmark } from 'react-icons/fa'
import BlogLikeButton from '@/components/blogpage/likebutton/BlogLikeButton'
import { auth } from '@/auth'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth()
    try {
        const { id } = await params
        const blog = await db.blog.findFirst({
            where: {
                id
            },
            include: {
                comments: true,
                likes: {
                    include: {
                        User: true
                    }
                },
                User: true
            }
        })
        console.log(blog)
        if (!blog) return <p>Blog Not found</p>
        return (
            <div className="w-7/12 mx-auto pt-8 pb-16 flex flex-col gap-6">
                <h1 className="text-5xl leading-snug">{blog.title}</h1>
                <BlogPageProfile name={blog.User?.name as string} image={blog.User?.imageUrl as string} date={formatDate(blog.createdAt)} />
                <div className="border-y-1 h-14 flex items-center justify-between text-xl px-3 text-gray-600">
                    <div className="flex gap-5 items-center">
                        <BlogLikeButton blogId={blog.id} initialNoOfLikes={blog.likes.length} initialLiked={blog.likes.some(e => e.userId === session?.user.id)} />
                        <FaRegComment />
                    </div>
                    <div>
                        <FaRegBookmark />
                    </div>
                </div>
                {blog.imageUrl &&
                    <div className="relative w-full h-[490px] overflow-hidden rounded-xl">
                        <Image src={blog.imageUrl} alt="cover image" quality={50} fill />
                    </div>
                }
                <p className="text-lg leading-loose">
                    {blog.content}
                </p>
            </div>
        )
    } catch {
        throw new Error("Something went wrong")
    }
}

export default page