import { db } from "@/lib/db"

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const formData = await request.formData()
        const blogId = formData.get("blogid") as string
        const title = formData.get("title") as string
        const content = formData.get("content") as string

        const updatedBlog = await db.blog.update({
            where: {
                id: blogId,
                userId,
            }, data: {
                title,
                content
            }
        })
        return Response.json({
            message: "blog updated successfully",
            data: updatedBlog
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "blog updation failed"
        }, {
            status: 500
        })
    }
}    