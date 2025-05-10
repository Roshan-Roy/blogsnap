import ProfileSuspense from "@/components/profilesuspense/ProfileSuspense"
import { FiGrid } from "react-icons/fi"

const Loading = () => {
    return (
        <>
            <ProfileSuspense />
            <div className="w-7/12 mx-auto flex h-12 mt-10 mb-3">
                <div className="flex-1 border-t-2"></div>
                <div className={`basis-28 flex justify-center items-center gap-2 text-sm text-gray-800 border-t-3 border-gray-700`}>
                    <FiGrid />
                    <span className="text-c">BLOGS</span>
                </div>
                <div className="flex-1 border-t-2"></div>
            </div>
            <div className="flex h-52 justify-center items-center">
                <div className="animate-spin inline-block size-10 border-5 border-current border-t-transparent text-gray-800 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading