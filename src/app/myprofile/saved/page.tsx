import SavedBlogs from "@/components/myprofile/savedblogs/SavedBlogs"
import { Suspense } from "react"

const page = () => {
  return <Suspense fallback={<div>Loading</div>}>
    <SavedBlogs />
  </Suspense>
}

export default page