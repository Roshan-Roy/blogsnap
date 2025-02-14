import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const formData = await request.formData()
        const blogId = formData.get("blogid") as string
        await db.blog.delete({
            where: {
                id: blogId,
                userId
            }
        })
        return Response.json({
            message: "blog deleted successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "blog deletion failed"
        }, {
            status: 500
        })
    }
}    