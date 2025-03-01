import { FiGrid } from "react-icons/fi"

const Bar = () => {
    return (
        <div className="w-7/12 mx-auto flex h-12 mt-10 mb-3">
            <div className="flex-1 border-t-2"></div>
            <div className={`basis-28 flex justify-center items-center gap-2 text-sm text-gray-800 border-t-3 border-gray-700`}>
                <FiGrid />
                <span className="text-c">BLOGS</span>
            </div>
            <div className="flex-1 border-t-2"></div>
        </div>
    )
}

export default Bar