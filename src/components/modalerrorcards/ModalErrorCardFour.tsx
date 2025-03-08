import { IoIosCloseCircle } from "react-icons/io";

const ModalErrorCardFour = ({
    closeFn
}: {
    closeFn: () => void
}) => {
    return <div className="flex items-center justify-between bg-red-100 text-sm font-semibold text-red-700 min-h-14 px-5 border border-red-600 rounded-lg w-full">
        <span>Something went wrong</span>
        <IoIosCloseCircle className="text-xl cursor-pointer" onClick={closeFn} />
    </div>
}

export default ModalErrorCardFour