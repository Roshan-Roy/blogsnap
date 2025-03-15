"use client"

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
    Select,
    SelectItem
} from "@nextui-org/react"
import { useState, useRef, KeyboardEvent, useEffect } from "react"
import ModalErrorCardOne from "@/components/modalerrorcards/ModalErrorCardOne"
import Image from "next/image"
import toast from "react-hot-toast"

interface Topic {
    id: string;
    topic: string;
}

export default function CreateBlogModal({ icon }: {
    icon: React.ReactElement;
}) {
    const { data: session } = useSession()
    const [error, setError] = useState(false)
    const [selectError, setSelectError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectLoading, setSelectLoading] = useState(false)
    const [selectTopics, setSelectTopics] = useState<Topic[]>([])
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const fileInputRef = useRef<HTMLInputElement>(null)
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
    const stylesForSelect = {
        label: "after:content-none",
    }

    const handleClearImageSelection = () => {
        setImage(null)
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.preventDefault()
    }
    const handleModalClose = () => {
        setError(false)
        handleClearImageSelection()
    }
    const handleFormSubmit = async (data: {
        [k: string]: FormDataEntryValue;
    }) => {
        setError(false)
        setLoading(true)
        try {
            const formData = new FormData()
            for (const key in data) formData.append(key, data[key].toString().trim())
            if (image) formData.append('image', image)
            const res = await fetch(`/api/addblog/${session?.user.id}`, {
                method: 'POST',
                body: formData
            });
            if (!res.ok)
                throw new Error()
            handleClearImageSelection()
            onClose()
            toast("Blog created successfully")
            router.refresh()
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    const getAllTopics = async () => {
        setSelectError(false)
        setSelectLoading(true)
        try {
            const res = await fetch("/api/alltopics")
            if (!res.ok) throw new Error()
            const body = await res.json()
            setSelectTopics(body.data)
        } catch {
            setSelectError(true)
        } finally {
            setSelectLoading(false)
        }
    }
    useEffect(() => {
        getAllTopics()
    }, [])
    return (
        <>
            <div onClick={onOpen} className="text-xl p-3 rounded-full cursor-pointer hover:bg-gray-100">{icon}</div>
            <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange} onClose={handleModalClose} scrollBehavior="inside" isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <Form validationBehavior="native" onSubmit={async (e) => {
                    e.preventDefault()
                    const data = Object.fromEntries(new FormData(e.currentTarget))
                    if (!loading) handleFormSubmit(data)
                }} >
                    <ModalContent>
                        <ModalHeader className="justify-center">Add New Blog</ModalHeader>
                        <ModalBody className="gap-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                            {error && <ModalErrorCardOne closeFn={() => setError(false)} />}
                            <Input label="Title" name="title" type="text" labelPlacement="outside" placeholder="Enter your blog title" classNames={stylesForInput} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Title is required"
                                else if (trimmedValue.length > 100) return "Title must me less than 100 characters long"
                            }} onKeyDown={handleKeyDown} />
                            <div className="flex flex-col items-center gap-4 my-2">
                                {
                                    imagePreview && <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
                                        <Image src={imagePreview} alt="preview image" fill />
                                    </div>
                                }
                                <div className="flex gap-2">
                                    {image ? <Button onPress={() => {
                                        if (!loading) handleClearImageSelection()
                                    }} className="w-56">Delete</Button> : <label htmlFor="image" className="flex justify-center items-center bg-gray-800 text-white w-56 h-10 text-xs font-semibold rounded-xl cursor-pointer">
                                        <span>Upload an image ( optional )</span>
                                    </label>}
                                    <input type="file" id="image" accept="image/*" ref={fileInputRef} className="hidden" disabled={loading} onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImage(e.target.files[0])
                                            setImagePreview(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <Select label="Topic" classNames={stylesForSelect} name="topic" placeholder="Select a topic" labelPlacement="outside" items={selectTopics} errorMessage="Topic is required" isLoading={selectLoading} isRequired hideEmptyContent>
                                    {(e) => (
                                        <SelectItem key={e.topic} className="capitalize">
                                            {e.topic}
                                        </SelectItem>
                                    )}
                                </Select>
                                {selectError && <div className="flex gap-3 items-center text-sm my-3">
                                    <p>Failed to load topics</p>
                                    <Button onPress={getAllTopics} size="sm">Retry</Button>
                                </div>}
                            </div>
                            <Textarea label="Content" name="content" placeholder="Enter your blog content" type="text" labelPlacement="outside" classNames={stylesForTextArea} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Content is required"
                                else if (trimmedValue.length > 10000) return "Content must be less than 10000 characters long"
                            }} onKeyDown={handleKeyDown} maxRows={100} minRows={20} />
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
