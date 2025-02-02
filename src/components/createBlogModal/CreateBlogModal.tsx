"use client"

import { useRouter } from "next/navigation"
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
    Form
} from "@nextui-org/react"
import { useState, useRef, KeyboardEvent } from "react"
import { IoCloseSharp } from "react-icons/io5"
import ModalErrorCard from "@/components/modalErrorCard/ModalErrorCard"
import Image from "next/image"

export default function CreateBlogModal({ icon }: {
    icon: React.ReactElement;
}) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const styles = {
        input: [
            "placeholder:text-xs"
        ]
    }
    const handleClearImageSelection = () => {
        setImage(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.preventDefault()
    }
    const handleModalClose = () => {
        setError(false)
        handleClearImageSelection()
        setImagePreview(null)
    }
    const handleCancelImageSelection = () => {
        handleClearImageSelection()
        setImagePreview(null)
    }
    const handleFormSubmit = async (data: {
        [k: string]: FormDataEntryValue;
    }) => {
        setError(false)
        setLoading(true)
        console.log(typeof data.name, data.name, "fuck")
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('bio', data.bio)
            if (image) formData.append('image', image)
            formData.append('facebook', data.facebook)
            formData.append('instagram', data.instagram)
            formData.append('linkedIn', data.linkedIn)
            formData.append('twitter', data.twitter)
            const res = await fetch(`/api/editprofile/`, {
                method: 'PATCH',
                body: formData
            });
            if (!res.ok)
                throw new Error()
            router.refresh()
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div onClick={onOpen} className="text-xl p-3 rounded-full cursor-pointer hover:bg-gray-100">{icon}</div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleModalClose} scrollBehavior="inside" isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <Form validationBehavior="native" onSubmit={(e) => {
                    e.preventDefault()
                    const data = Object.fromEntries(new FormData(e.currentTarget))
                    if (!loading) handleFormSubmit(data)
                }} >
                    <ModalContent>
                        <ModalHeader className="justify-center">Edit profile</ModalHeader>
                        <ModalBody className="gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                            {error && <ModalErrorCard closeFn={() => setError(false)} />}
                            <div className="flex flex-col items-center gap-4 mb-1">
                                <div className="relative min-h-36 w-36 bg-gray-100 rounded-full overflow-hidden">
                                    <Image src={imagePreview ? imagePreview : "/user.png"} alt="preview image" fill />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="image" className="flex justify-center items-center bg-gray-800 text-white w-32 h-10 text-xs font-semibold rounded-xl cursor-pointer">
                                        <span>Change photo</span>
                                    </label>
                                    <input type="file" id="image" accept="image/*" ref={fileInputRef} className="hidden" disabled={loading} onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImage(e.target.files[0])
                                            setImagePreview(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} />
                                    {image && <Button onPress={() => {
                                        if (!loading) handleCancelImageSelection()
                                    }} isIconOnly><IoCloseSharp className="text-xl" /></Button>}
                                </div>
                            </div>
                            <Input label="Name" name="name" type="text" labelPlacement="outside" placeholder="Enter your name" classNames={styles} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Name is required"
                                else if (trimmedValue.length > 20) return "Name must me less than 20 characters long"
                            }} onKeyDown={handleKeyDown} />
                            <Input label="Bio" name="bio" placeholder="Enter your bio" type="text" labelPlacement="outside" classNames={styles} validate={value => {
                                const trimmedValue = value.trim()
                                if (trimmedValue.length < 1) return "Bio is required"
                                else if (trimmedValue.length > 70) return "Bio must be less than 70 characters long"
                            }} onKeyDown={handleKeyDown} />
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
