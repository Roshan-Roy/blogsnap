import { db } from "@/lib/db"

export async function GET() {
    try {
        const allTopics = await db.topic.findMany({
            orderBy: {
                topic: "asc"
            }
        })
        return Response.json({
            message: "success",
            data: allTopics
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}    