import MyBlogs from "@/components/myprofile/myblogs/MyBlogs"
import { Suspense } from "react"

const page = () => {
    return <Suspense fallback={<div>Loading</div>}>
        <MyBlogs />
    </Suspense>
}

export default page