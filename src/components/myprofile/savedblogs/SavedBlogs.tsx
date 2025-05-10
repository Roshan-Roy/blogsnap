import CardWithImage from "@/components/blogcards/blogCardSaved/CardWithImage"
import CardWithoutImage from "@/components/blogcards/blogCardSaved/CardWithoutImage"
import { db } from "@/lib/db"
import { auth } from "@/auth"

const SavedBlogs = async () => {
    const session = await auth()
    try {
        const savedBlogs = await db.saved.findMany({
            where: {
                userId: session?.user.id
            },
            include: {
                Blog: {
                    include: {
                        User: true,
                        likes: true,
                        comments: true
                    }
                }
            }
        })
        if (savedBlogs.length === 0) return <div className="flex h-52 justify-center items-center text-xl text-gray-400">
            <span>No saved blogs</span>
        </div>
        return (
            <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-20">
                {savedBlogs.map(e => {
                    if (e.Blog?.imageUrl) return <CardWithImage
                        id={e.Blog.id}
                        userId={e.Blog.User?.id as string}
                        title={e.Blog.title}
                        content={e.Blog.content}
                        topic={e.Blog.topic}
                        imageUrl={e.Blog.imageUrl}
                        noOfLikes={e.Blog.likes.length}
                        noOfComments={e.Blog.comments.length}
                        userName={e.Blog.User?.name as string}
                        userImage={e.Blog.User?.imageUrl}
                        dateOfCreation={e.Blog.createdAt}
                        key={e.Blog.id} />
                    if (e.Blog)
                        return <CardWithoutImage
                            id={e.Blog.id}
                            userId={e.Blog.User?.id as string}
                            title={e.Blog.title}
                            content={e.Blog.content}
                            topic={e.Blog.topic}
                            noOfLikes={e.Blog.likes.length}
                            noOfComments={e.Blog.comments.length}
                            userName={e.Blog.User?.name as string}
                            userImage={e.Blog.User?.imageUrl}
                            dateOfCreation={e.Blog.createdAt}
                            key={e.Blog.id}
                        />
                })}
            </div>
        )
    } catch {
        throw new Error("Something went wrong")
    }

}

export default SavedBlogs