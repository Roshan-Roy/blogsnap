import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await db.follow.delete({ where: { id } })

        return Response.json({
            message: "unfollowed successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "unfollowing failed"
        }, {
            status: 500
        })
    }
}    