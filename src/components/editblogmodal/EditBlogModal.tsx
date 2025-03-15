import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Spinner,
    Form,
    Textarea,
} from "@nextui-org/react"
import { useState, KeyboardEvent } from "react"
import ModalErrorCard from "@/components/modalerrorcards/ModalErrorCardOne"
import { MdModeEditOutline } from "react-icons/md"
import toast from "react-hot-toast"


export default function EditBlogModal({ id, title, content }: {
    id: string;
    title: string,
    content: string
}) {
    const [values, setValues] = useState({
        title,
        content
    })
    const { data: session } = useSession()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const router = useRouter()

    const stylesForInput = {
        input: [
            "placeholder:text-xs"
        ]
    }
    const stylesForTextArea = {
        input: [
            "placeholder:text-xs mt-1"
        ]
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.preventDefault()
    }
    const handleFormSubmit = async (data: {
        [k: string]: FormDataEntryValue;
    }) => {
        setError(false)
        setLoading(true)
        try {
            const formData = new FormData()
            for (const key in data) formData.append(key, data[key].toString().trim())
            formData.append("blogid", id)
            const res = await fetch(`/api/editblog/${session?.user.id}`, {
                method: 'PATCH',
                body: formData
            });
            if (!res.ok)
                throw new Error()
            const { data: { title, content } } = await res.json()
            setValues({ title, content })
            toast("Blog edited successfully")
            onClose()
            router.refresh()
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="p-2 hover:bg-gray-200 rounded-full" onClick={onOpen}>
                <MdModeEditOutline />
            </div>
            <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange} scrollBehavior="inside" isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <Form validationBehavior="native" onSubmit={async (e) => {
                    e.preventDefault()
                    const data = Object.fromEntries(new FormData(e.currentTarget))
                    if (!loading) handleFormSubmit(data)
                }} >
                    <ModalContent>
                        <ModalHeader className="justify-center">Edit Blog</ModalHeader>
                        <ModalBody className="gap-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                            {error && <ModalErrorCard closeFn={() => setError(false)} />}
                            <Input label="Title" name="title" type="text" labelPlacement="outside" placeholder="Enter your blog title" classNames={stylesForInput} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Title is required"
                                else if (trimmedValue.length > 100) return "Title must me less than 100 characters long"
                            }} defaultValue={values.title} onKeyDown={handleKeyDown} />
                            <Textarea label="Content" name="content" placeholder="Enter your blog content" type="text" labelPlacement="outside" classNames={stylesForTextArea} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Content is required"
                                else if (trimmedValue.length > 10000) return "Content must be less than 10000 characters long"
                            }} onKeyDown={handleKeyDown} maxRows={100} minRows={10} defaultValue={values.content} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" className="bg-gray-800 font-semibold text-xs w-32" type="submit" disableRipple>
                                {loading ? <Spinner size="sm" color="default" /> : "Submit"}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Form>
            </Modal>
        </>
    );
}
