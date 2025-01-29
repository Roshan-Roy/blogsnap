import { db } from "@/lib/db"
import cloudinary from "@/lib/cloudinary"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const currentUser = await db.user.findUnique({
        where: {
            id
        }
    })
    try {
        const deleteResult = await cloudinary.uploader.destroy(currentUser?.publicId as string)
        if (deleteResult.result !== "ok") {
            throw new Error()
        }
        await db.user.update({
            where: {
                id
            },
            data: {
                imageUrl: null,
                publicId: null
            }
        })
        return Response.json({
            message: "profile picture deleted successfully",
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "profile picture deletion failed"
        }, {
            status: 500
        })
    }
}