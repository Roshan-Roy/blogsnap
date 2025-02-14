import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react"
import { MdDeleteOutline } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import { useState } from "react"
import ModalErrorCardTwo from "../modalerrorcards/ModalErrorCardTwo"
import { useSession } from "next-auth/react"
import { Spinner } from "@nextui-org/react"

const DeleteBlogModal = ({
    id
}: {
    id: string;
}) => {
    const { data: session } = useSession()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const handleDeleteBtnClick = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("blogid", id)
            const res = await fetch(`/api/deleteblog/${session?.user.id}`, {
                method: 'DELETE',
                body: formData
            });
        } catch {

        } finally {

        }
    }
    return (
        <>
            <div className="p-2 hover:bg-gray-200 rounded-full" onClick={e => {
                e.stopPropagation()
                onOpen()
            }}>
                <MdDeleteOutline className="cursor-pointer" />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <ModalContent>
                    <ModalBody className="items-center pt-10 pb-8">
                        <RiDeleteBinLine className="text-7xl" />
                        <h1 className="font-semibold text-xl">Confirm Delete</h1>
                        <p className="text-gray-600 text-sm">Are you sure you want to delete this blog?</p>
                    </ModalBody>
                    {error && <ModalErrorCardTwo closeFn={() => setError(false)} />}
                    <ModalFooter>
                        {!loading &&
                            <Button color="default" className="font-semibold text-xs flex-1" onPress={onClose} disableRipple>
                                Cancel
                            </Button>
                        }
                        <Button color="primary" className="bg-gray-800 font-semibold text-xs flex-1" onPress={() => {
                            if (!loading) handleDeleteBtnClick()
                        }} disableRipple>
                            {loading ? <Spinner size="sm" color="default" /> : "Delete"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
}

export default DeleteBlogModal