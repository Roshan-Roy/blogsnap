import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params
        const { title, message } = await request.json()

        await db.feedback.create({
            data: {
                userId,
                title,
                message
            }
        })

        return Response.json({
            message: "feedback sent successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "unable to send feedback"
        }, {
            status: 500
        })
    }
}    