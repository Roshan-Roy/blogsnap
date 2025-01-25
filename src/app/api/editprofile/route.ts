import { db } from "@/lib/db"

export async function PATCH(request: Request) {
    const {
        userId,
        name,
        bio,
        whatsapp,
        facebook,
        instagram,
        linkedIn
    } = await request.json()
    try {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                bio,
                whatsapp,
                facebook,
                instagram,
                linkedIn
            }
        })
        return Response.json({
            message: "profile updated successfully"
        }, {
            status: 200
        })
    } catch {
        return Response.json({
            message: "profile updation failed"
        }, {
            status: 500
        })
    }
}