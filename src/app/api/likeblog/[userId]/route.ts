import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId } = await request.json()

        await db.like.create({
            data: {
                userId,
                blogId
            }
        })

        return Response.json({
            message: "blog liked successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "blog liking failed"
        }, {
            status: 500
        })
    }
}    