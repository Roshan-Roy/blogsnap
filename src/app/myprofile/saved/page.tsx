import SavedBlogs from "@/components/myprofile/savedblogs/SavedBlogs"
import { Suspense } from "react"

const page = () => {
  return <Suspense fallback={
    <div className="flex h-52 justify-center items-center">
      <div className="animate-spin inline-block size-10 border-5 border-current border-t-transparent text-gray-800 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }>
    <SavedBlogs />
  </Suspense>
}

export default page