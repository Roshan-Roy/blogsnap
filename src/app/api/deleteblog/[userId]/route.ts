import { db } from "@/lib/db"
import cloudinary from "@/lib/cloudinary"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId } = await request.json()
        const blog = await db.blog.findUnique({
            where: {
                id: blogId,
                userId
            }
        })
        if (blog?.publicId) {
            const deleteResult = await cloudinary.uploader.destroy(blog.publicId)
            if (deleteResult.result !== "ok") {
                throw new Error()
            }
        }
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