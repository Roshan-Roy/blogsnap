import { db } from "@/lib/db"

export async function GET() {
    try {
        const allBLogs = await db.blog.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                User: true,
                saved: true,
                likes: true,
                comments: true
            }
        })
        return Response.json({
            message: "success",
            data: allBLogs
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