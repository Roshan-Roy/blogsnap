import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId } = await request.json()

        await db.saved.deleteMany({
            where: {
                userId,
                blogId
            }
        })

        return Response.json({
            message: "blog unsaved successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "blog unsaving failed"
        }, {
            status: 500
        })
    }
}    