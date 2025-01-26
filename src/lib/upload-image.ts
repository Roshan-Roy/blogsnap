import cloudinary from "./cloudinary"

const uploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)

    return new Promise((res, rej) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder
        }, async (error, result) => {
            if (error) {
                return rej(error.message)
            }
            return res(result)
        }).end(bytes)
    })
}

export default uploadImage