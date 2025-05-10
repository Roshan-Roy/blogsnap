import CardWithImage from "@/components/blogcards/blogCardMyProfile/CardWithImage"
import CardWithoutImage from "@/components/blogcards/blogCardMyProfile/CardWithoutImage"
import { db } from "@/lib/db"
import { auth } from "@/auth"

const MyBlogs = async () => {
    const session = await auth()
    try {
        const myBlogs = await db.blog.findMany({
            where: {
                userId: session?.user.id
            },
            include: {
                likes: true,
                comments: true,
                User: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        if (myBlogs.length === 0) return <div className="flex h-52 justify-center items-center text-xl text-gray-400">
            <span>No blogs yet</span>
        </div>
        return (
            <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-20">
                {myBlogs.map(e => {
                    if (e.imageUrl) return <CardWithImage
                        id={e.id}
                        title={e.title}
                        content={e.content}
                        topic={e.topic}
                        imageUrl={e.imageUrl}
                        noOfLikes={e.likes.length}
                        noOfComments={e.comments.length}
                        userName={e.User?.name as string}
                        userImage={e.User?.imageUrl}
                        dateOfCreation={e.createdAt}
                        key={e.id} />
                    return <CardWithoutImage
                        id={e.id}
                        title={e.title}
                        content={e.content}
                        topic={e.topic}
                        noOfLikes={e.likes.length}
                        noOfComments={e.comments.length}
                        userName={e.User?.name as string}
                        userImage={e.User?.imageUrl}
                        dateOfCreation={e.createdAt}
                        key={e.id}
                    />
                })}
            </div>
        )
    } catch {
        throw new Error("Something went wrong")
    }

}

export default MyBlogs