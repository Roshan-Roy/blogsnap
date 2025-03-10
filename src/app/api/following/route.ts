import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function GET() {
    const session = await auth()
    try {
        const user = await db.user.findUnique({
            where: {
                id: session?.user.id
            },
            include: {
                following: {
                    include: {
                        Follows: {
                            include: {
                                blogs: {
                                    include: {
                                        likes: true,
                                        comments: true,
                                        saved: true,
                                        User: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        const followingBlogs = user?.following.map(e => e.Follows).map(e => e?.blogs).flat().sort((a, b) => new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime())
        return Response.json({
            message: "success",
            data: followingBlogs
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}    