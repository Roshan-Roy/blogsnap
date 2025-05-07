import { Button } from "@nextui-org/react"
import { MdErrorOutline } from "react-icons/md";

const ErrorCard = ({ retryFn }: {
    retryFn: () => void
}) => {
    return (
        <div className="h-[calc(100dvh-160px)] flex justify-center items-center">
            <div className="flex flex-col gap-6 items-center">
                <MdErrorOutline className="text-6xl"/>
                <p className="text-xl">Something went wrong</p>
                <Button className="bg-gray-800 rounded-lg text-white px-10" onPress={retryFn}>Try Again</Button>
            </div>
        </div>
    )
}

export default ErrorCard