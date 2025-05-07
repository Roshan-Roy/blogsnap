import { FaRegFaceFrownOpen } from "react-icons/fa6"

const NoResults = () => {
    return (
        <div className="h-[calc(100dvh-160px)] flex justify-center items-center">
            <div className="flex flex-col gap-6 items-center">
                <FaRegFaceFrownOpen className="text-6xl"/>
                <p className="text-xl">No results</p>
            </div>
        </div>
    )
}

export default NoResults