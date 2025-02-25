import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId, comment } = await request.json()

        await db.comment.create({
            data: {
                userId,
                blogId,
                comment
            }
        })

        return Response.json({
            message: "comment added successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "comment adding failed"
        }, {
            status: 500
        })
    }
}    