import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { blogId } = await request.json()

        await db.saved.create({
            data: {
                userId,
                blogId
            }
        })

        return Response.json({
            message: "blog saved successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "blog saving failed"
        }, {
            status: 500
        })
    }
}    