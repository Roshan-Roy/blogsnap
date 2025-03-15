import { db } from "@/lib/db"

export async function GET() {
    try {
        const allUsers = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return Response.json({
            message: "success",
            data: allUsers
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