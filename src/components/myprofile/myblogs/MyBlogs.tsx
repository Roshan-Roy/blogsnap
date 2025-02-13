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
            }
        })
        return (
            <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-10">
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