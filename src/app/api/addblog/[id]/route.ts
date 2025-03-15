import { db } from "@/lib/db"
import uploadImage from "@/lib/upload-image"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const formData = await request.formData()
        const title = formData.get("title") as string
        const content = formData.get("content") as string
        const topic = formData.get("topic") as string
        const image = formData.get("image") as File
        
        if (image) {
            const uploadResult: any = await uploadImage(image, "blog_pictures")
            await db.blog.create({
                data: {
                    title,
                    content,
                    topic,
                    userId: id,
                    imageUrl: uploadResult.secure_url as string,
                    publicId: uploadResult.public_id as string
                }
            })
        } else {
            await db.blog.create({
                data: {
                    title,
                    content,
                    topic,
                    userId: id
                }
            })
        }

        return Response.json({
            message: "blog created successfully",
        }, {
            status: 201
        })
    } catch {
        return Response.json({
            message: "blog creation failed"
        }, {
            status: 500
        })
    }
}    