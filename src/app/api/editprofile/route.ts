import { db } from "@/lib/db"
import uploadImage from "@/lib/upload-image"

export async function PATCH(request: Request) {
    const formData = await request.formData()
    try {
        const image = formData.get("image") as File
        const uploadResult: any = await uploadImage(image, "profile_pictures")
        console.log(uploadResult)
        await db.user.update({
            where: {
                id: formData.get("userId") as string
            },
            data: {
                name: formData.get("name") as string,
                bio: formData.get("bio") as string,
                facebook: formData.get("facebook") as string,
                instagram: formData.get("instagram") as string,
                linkedIn: formData.get("linkedIn") as string,
                twitter: formData.get("twitter") as string,
                imageUrl: uploadResult.secure_url as string,
                publicId: uploadResult.public_id as string
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
            status: 404
        })
    }
}    