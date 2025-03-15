import cloudinary from "@/lib/cloudinary"
import { db } from "@/lib/db"
import uploadImage from "@/lib/upload-image"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const formData = await request.formData()
        const name = formData.get("name") as string
        const bio = formData.get("bio") as string
        const image = formData.get("image") as File
        const facebook = formData.get("facebook") as string
        const instagram = formData.get("instagram") as string
        const linkedIn = formData.get("linkedIn") as string
        const twitter = formData.get("twitter") as string

        const currentUser = await db.user.findUnique({
            where: {
                id
            }
        })
        let updatedUser

        if (image) {
            if (currentUser?.publicId) {
                const deleteResult = await cloudinary.uploader.destroy(currentUser.publicId)
                if (deleteResult.result !== "ok") {
                    throw new Error()
                }
            }
            const uploadResult: any = await uploadImage(image, "profile_pictures")
            updatedUser = await db.user.update({
                where: {
                    id
                },
                data: {
                    name,
                    bio,
                    facebook,
                    instagram,
                    linkedIn,
                    twitter,
                    imageUrl: uploadResult.secure_url as string,
                    publicId: uploadResult.public_id as string
                }
            })
        } else {
            updatedUser = await db.user.update({
                where: {
                    id
                },
                data: {
                    name,
                    bio,
                    facebook,
                    instagram,
                    linkedIn,
                    twitter
                }
            })
        }
        return Response.json({
            message: "profile updated successfully",
            data: updatedUser
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