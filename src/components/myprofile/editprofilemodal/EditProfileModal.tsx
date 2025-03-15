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
import { MdDeleteOutline } from "react-icons/md"
import { IoCloseSharp } from "react-icons/io5"
import ModalErrorCard from "@/components/modalerrorcards/ModalErrorCardOne"
import Image from "next/image"
import toast from "react-hot-toast"

interface User {
  id: string;
  name: string | null;
  imageUrl: string | null;
  bio: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
}

export default function EditProfileModal({
  id,
  name,
  bio,
  imageUrl,
  twitter,
  facebook,
  instagram,
  linkedIn
}: User) {
  const [values, setValues] = useState({
    name,
    bio,
    twitter,
    facebook,
    instagram,
    linkedIn
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDeleting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl)
  const [isImageSet, setIsImageSet] = useState(imageUrl !== null)
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
    if (fileInputRef.current)
      fileInputRef.current.value = ""
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault()
  }
  const handleModalClose = () => {
    setError(false)
    handleClearImageSelection()
    setImagePreview(imageUrl)
  }
  const handleCancelImageSelection = () => {
    handleClearImageSelection()
    setImagePreview(imageUrl)
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
      const res = await fetch(`/api/editprofile/${id}`, {
        method: 'PATCH',
        body: formData
      });
      if (!res.ok)
        throw new Error()
      const body = await res.json()
      const { name, bio, twitter, facebook, instagram, linkedIn, imageUrl } = body.data
      if (imageUrl) {
        setImagePreview(body.data.imageUrl)
        setIsImageSet(true)
      }
      setValues({ name, bio, twitter, facebook, instagram, linkedIn })
      handleClearImageSelection()
      onClose()
      toast("Profile updated successfully")
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const handleImageDelete = async () => {
    setError(false)
    setLoadingDeleting(true)
    try {
      const res = await fetch(`/api/deleteprofilepicture/${id}`, {
        method: "DELETE"
      })
      if (!res.ok)
        throw new Error()
      setImagePreview(null)
      setIsImageSet(false)
      handleClearImageSelection()
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoadingDeleting(false)
    }
  }
  return (
    <>
      <Button onPress={onOpen} size="sm" className="w-32 font-semibold bg-gray-800 text-white" disableRipple>Edit Profile</Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleModalClose} scrollBehavior="inside" isKeyboardDismissDisabled={loading || loadingDelete} isDismissable={!loading && !loadingDelete} hideCloseButton={loading || loadingDelete}>
        <Form validationBehavior="native" onSubmit={(e) => {
          e.preventDefault()
          const data = Object.fromEntries(new FormData(e.currentTarget))
          if (!loading && !loadingDelete) handleFormSubmit(data)
        }} >
          <ModalContent>
            <ModalHeader className="justify-center">Edit profile</ModalHeader>
            <ModalBody className="gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
              {error && <ModalErrorCard closeFn={() => setError(false)} />}
              <div className="flex flex-col items-center gap-4 mb-1">
                <div className="relative h-36 w-36 bg-gray-100 rounded-full overflow-hidden">
                  <Image src={imagePreview ? imagePreview : "/user.png"} alt="preview image" fill />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="image" className="flex justify-center items-center bg-gray-800 text-white w-32 h-10 text-xs font-semibold rounded-xl cursor-pointer">
                    <span>Change photo</span>
                  </label>
                  <input type="file" id="image" accept="image/*" ref={fileInputRef} className="hidden" disabled={loading || loadingDelete} onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0])
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                    }
                  }} />
                  {image ? <Button onPress={() => {
                    if (!loading) handleCancelImageSelection()
                  }} isIconOnly><IoCloseSharp className="text-xl" /></Button> : isImageSet ? <Button onPress={() => {
                    if (!loading && !loadingDelete) handleImageDelete()
                  }} isIconOnly>
                    {loadingDelete ? <Spinner size="sm" color="current" /> : <MdDeleteOutline className="text-xl text-gray-800" />}
                  </Button> : null}
                </div>
              </div>
              <Input label="Name" name="name" type="text" labelPlacement="outside" placeholder="Enter your name" classNames={styles} defaultValue={values.name as string} validate={value => {
                const trimmedValue = value.trim()
                if (trimmedValue.length < 1) return "Name is required"
                else if (trimmedValue.length > 20) return "Name must me less than 20 characters long"
              }} onKeyDown={handleKeyDown} />
              <Input label="Bio" name="bio" placeholder="Enter your bio" type="text" labelPlacement="outside" classNames={styles} defaultValue={values.bio} validate={value => {
                const trimmedValue = value.trim()
                if (trimmedValue.length < 1) return "Bio is required"
                else if (trimmedValue.length > 70) return "Bio must be less than 70 characters long"
              }} onKeyDown={handleKeyDown} />
              <h2 className="text-center pt-3 pb-1 font-semibold">Social Links</h2>
              <Input label="Facebook" name="facebook" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={values.facebook} onKeyDown={handleKeyDown} />
              <Input label="Instagram" name="instagram" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={values.instagram} onKeyDown={handleKeyDown} />
              <Input label="Linkedin" name="linkedIn" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={values.linkedIn} onKeyDown={handleKeyDown} />
              <Input label="Twitter (X)" name="twitter" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={values.twitter} onKeyDown={handleKeyDown} />
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
