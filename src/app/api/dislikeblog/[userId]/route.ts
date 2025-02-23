import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId } = await request.json()

        await db.like.deleteMany({
            where: {
                userId,
                blogId
            }
        })

        return Response.json({
            message: "blog disliked successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "blog dislike failed"
        }, {
            status: 500
        })
    }
}    