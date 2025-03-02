import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { id } = await request.json()

        await db.follow.create({
            data: {
                followedById: userId,
                followsId: id,
            },
        });

        return Response.json({
            message: "followed successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "following failed"
        }, {
            status: 500
        })
    }
}    