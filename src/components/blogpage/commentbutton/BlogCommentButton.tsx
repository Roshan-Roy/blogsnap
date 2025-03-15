"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import ModalErrorCardThree from "@/components/modalerrorcards/ModalErrorCardThree"
import {
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Button
} from "@nextui-org/react"
import { useState } from "react"
import { FaRegComment } from "react-icons/fa"
import CommentCard from "./commentcard/CommentCard"

interface Comment {
    id: string;
    userId: string;
    name: string;
    image: string;
    createdAt: string;
    comment: string;
}

const BlogCommentButton = ({
    blogId,
    comments
}: {
    blogId: string;
    comments: Comment[];
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [value, setValue] = useState("")

    const activateError = () => setError(true)
    const deactivateError = () => setError(false)
    const activateDeleteLoading = () => setDeleteLoading(true)
    const deactivateDeleteLoading = () => setDeleteLoading(false)

    const handlePostBtnClick = async () => {
        setLoading(true)
        setError(false)
        try {
            const res = await fetch(`/api/addcomment/${session?.user.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    blogId,
                    comment: value
                })
            })
            if (!res.ok)
                throw new Error()
            setValue("")
            router.refresh()
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center">
            <div onClick={onOpen} className="border-2 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                <FaRegComment />
            </div>
            <span className="text-sm font-semibold p-2 rounded-full cursor-pointer">{comments.length}</span>
            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => setError(false)} scrollBehavior="inside" radius="sm" isKeyboardDismissDisabled={loading || deleteLoading} isDismissable={!loading && !deleteLoading} hideCloseButton={loading || deleteLoading}>
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{comments.length} {comments.length <= 1 ? "Comment" : "Comments"}</ModalHeader>
                    <div className="flex flex-col sticky top-0 z-50 bg-white py-4 px-5 gap-4">
                        <div className="flex gap-2">
                            <Input placeholder="Add a comment..." classNames={{
                                input: [
                                    "placeholder:text-xs"
                                ]
                            }} value={value} onValueChange={e => setValue(e)} />
                            <Button color="primary" className="bg-gray-800 font-semibold text-xs" onPress={() => {
                                if (!loading && value !== "" && value.length < 1000) handlePostBtnClick()
                            }} disableRipple>
                                {loading ? <Spinner size="sm" color="default" /> : "Post"}
                            </Button>
                        </div>
                        {error && <ModalErrorCardThree closeFn={() => setError(false)} />}
                    </div>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full px-7">
                        <div className="min-h-[300px] flex flex-col gap-4">
                            {comments.map(e => <CommentCard
                                key={e.id}
                                activateError={activateError}
                                deactivateError={deactivateError}
                                activateDeleteLoading={activateDeleteLoading}
                                deactivateDeleteLoading={deactivateDeleteLoading}
                                deleteLoading={deleteLoading}
                                {...e} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default BlogCommentButton