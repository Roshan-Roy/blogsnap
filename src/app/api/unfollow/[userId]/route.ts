import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { id } = await request.json()

        await db.follow.deleteMany({
            where: {
                followedById: userId,
                followsId: id,
            },
        });

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