import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function PATCH(request: Request) {
    const session = await auth()
    /*await db.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            whatsapp: ""
        }
    })*/
    const body = await request.json()
    console.log(body)
}