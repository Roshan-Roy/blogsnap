import React from 'react'
import { db } from '@/lib/db'
import BlogPageProfile from '@/components/blogpage/profile/BlogPageProfile'
import formatDate from '@/lib/format-date'
import Image from 'next/image'
import BlogCommentButton from '@/components/blogpage/commentbutton/BlogCommentButton'
import BlogLikeButton from '@/components/blogpage/likebutton/BlogLikeButton'
import { auth } from '@/auth'
import BlogSaveButton from '@/components/savebutton/BlogSaveButtonPage'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth()
    try {
        const { id } = await params
        const blog = await db.blog.findFirst({
            where: {
                id
            },
            include: {
                comments: {
                    include: {
                        User: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: {
                    include: {
                        User: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                saved: true,
                User: true
            }
        })
        if (!blog) return <div className="flex h-[calc(100dvh-80px)] justify-center items-center text-xl">
            <span>Blog not found</span>
        </div>
        return (
            <div className="w-7/12 mx-auto pt-8 pb-16 flex flex-col gap-7">
                <h1 className="text-6xl leading-snug font-semibold">{blog.title}</h1>
                <BlogPageProfile id={blog.User?.id as string} name={blog.User?.name as string} image={blog.User?.imageUrl as string} date={formatDate(blog.createdAt)} />
                <div className="border-y-1 h-14 flex items-center justify-between text-xl px-3 text-gray-600">
                    <div className="flex gap-3 items-center">
                        <BlogLikeButton blogId={blog.id} initialLiked={blog.likes.some(e => e.userId === session?.user.id)} likedUsers={blog.likes.map(e => ({ name: e.User?.name as string, id: e.User?.id as string, image: e.User?.imageUrl as string, email: e.User?.email as string }))} />
                        <BlogCommentButton blogId={blog.id} comments={blog.comments.map(e => ({ id: e.id, userId: e.User?.id as string, name: e.User?.name as string, image: e.User?.imageUrl as string, comment: e.comment, createdAt: formatDate(e.createdAt) }))} />
                    </div>
                    <BlogSaveButton blogId={blog.id} initialSaved={blog.saved.some(e => e.userId === session?.user.id)} />
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