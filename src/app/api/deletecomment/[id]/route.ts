import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await db.comment.delete({
            where: {
                id
            }
        })
        return Response.json({
            message: "comment deleted successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "comment deletion failed"
        }, {
            status: 500
        })
    }
}    