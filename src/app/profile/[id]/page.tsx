import { FiGrid } from "react-icons/fi"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Image from "next/image"
import { db } from "@/lib/db"
import CardWithImage from "@/components/blogcards/blogCard/CardWithImage"
import CardWithoutImage from "@/components/blogcards/blogCard/CardWithoutImage"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const session = await auth()
    if (session?.user.id === id) redirect("/myprofile")
    try {
        const user = await db.user.findFirst({
            where: {
                id
            },
            include: {
                blogs: {
                    include: {
                        comments: true,
                        likes: true,
                        saved: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        if (!user) return <div>User not found</div>
        return (
            <>
                <div className="flex w-5/12 mx-auto justify-center gap-12 mt-10">
                    <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gray-100">
                        <Image fill={true} src={user.imageUrl ? user.imageUrl : "/user.png"} alt="No profile picture" />
                    </div>
                    <div className="flex-1 flex flex-col gap-5 text-lg">
                        <div className="flex justify-between">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            One
                        </div>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <div className="flex justify-between">
                            <p className="flex-1"><span className="font-bold text-2xl mr-2">{user.blogs.length}</span>Posts</p>
                            <p className="flex-1 text-center"><span className="font-bold text-2xl mr-2">0</span>Followers</p>
                            <p className="flex-1 text-right"><span className="font-bold text-2xl mr-2">0</span>Following</p>
                        </div>
                        <p className="leading-8 text-gray-600">{user?.bio}</p>
                        <div className="flex text-2xl gap-5 mt-2">
                            <Link href={user.facebook ? user.facebook : "#"}><FaFacebook className={`${user.facebook ? "opacity-100" : "opacity-10"}`} /></Link>
                            <Link href={user.instagram ? user.instagram : "#"}><FaInstagram className={`${user.instagram ? "opacity-100" : "opacity-10"}`} /></Link>
                            <Link href={user.linkedIn ? user.linkedIn : "#"}><FaLinkedin className={`${user.linkedIn ? "opacity-100" : "opacity-10"}`} /></Link>
                            <Link href={user.twitter ? user.twitter : "#"}><FaXTwitter className={`${user.twitter ? "opacity-100" : "opacity-10"}`} /></Link>
                        </div>
                    </div>
                </div>
                <div className="w-7/12 mx-auto flex h-12 mt-10 mb-3">
                    <div className="flex-1 border-t-2"></div>
                    <div className={`basis-28 flex justify-center items-center gap-2 text-sm text-gray-800 border-t-3 border-gray-700`}>
                        <FiGrid />
                        <span className="text-c">BLOGS</span>
                    </div>
                    <div className="flex-1 border-t-2"></div>
                </div>
                <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-20">
                    {user.blogs.map(e => {
                        if (e.imageUrl) return <CardWithImage
                            id={e.id}
                            title={e.title}
                            content={e.content}
                            topic={e.topic}
                            imageUrl={e.imageUrl}
                            noOfLikes={e.likes.length}
                            noOfComments={e.comments.length}
                            userName={user.name as string}
                            userImage={user.imageUrl}
                            initialSaved={e.saved.some(e => e.userId === session?.user.id)}
                            dateOfCreation={e.createdAt}
                            key={e.id} />
                        return <CardWithoutImage
                            id={e.id}
                            title={e.title}
                            content={e.content}
                            topic={e.topic}
                            noOfLikes={e.likes.length}
                            noOfComments={e.comments.length}
                            userName={user.name as string}
                            userImage={user.imageUrl}
                            initialSaved={e.saved.some(e => e.userId === session?.user.id)}
                            dateOfCreation={e.createdAt}
                            key={e.id}
                        />
                    })}
                </div>
            </>
        )
    } catch {
        throw new Error("Something went wrong")
    }

}

export default page