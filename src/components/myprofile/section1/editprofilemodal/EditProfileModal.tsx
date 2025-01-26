"use client"

import { useSession } from "next-auth/react"
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

import { useState } from "react"
import ModalErrorCard from "@/components/modalErrorCard/ModalErrorCard"

export default function EditProfileModal({
  name,
  bio,
  twitter,
  facebook,
  instagram,
  linkedIn
}: {
  name: string;
  bio?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
}) {
  const { data: session } = useSession()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter()

  const styles = {
    input: [
      "placeholder:text-xs"
    ]
  }
  const handleModalClose = () => {
    setError(false)
    setImage(null)
  }
  const handleFormSubmit = async (data: {
    [k: string]: FormDataEntryValue;
  }) => {
    console.log(image)
    setError(false)
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('userId', session?.user.id as string)
      formData.append('image', image as File)
      formData.append('name', data.name)
      formData.append('bio', data.bio)
      formData.append('facebook', data.facebook)
      formData.append('instagram', data.instagram)
      formData.append('linkedIn', data.linkedIn)
      formData.append('twitter', data.twitter)
      const res = await fetch('/api/editprofile', {
        method: 'PATCH',
        body: formData
      });
      if (!res.ok)
        throw new Error()
      onClose()
      setImage(null)
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button onPress={onOpen} size="sm" className="w-32 font-semibold bg-gray-800 text-white" disableRipple>Edit Profile</Button>
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
              <input type="file" accept="image/*" onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }} />
              <Input label="Name" name="name" type="text" labelPlacement="outside" placeholder="Enter your name" classNames={styles} defaultValue={name} validate={value => {
                const trimmedValue = value.trim()
                if (trimmedValue.length < 1) return "Name is required"
                else if (trimmedValue.length > 20) return "Name must me less than 20 characters long"
              }} />
              <Input label="Bio" name="bio" placeholder="Enter your bio" type="text" labelPlacement="outside" classNames={styles} defaultValue={bio} validate={value => {
                const trimmedValue = value.trim()
                if (trimmedValue.length < 1) return "Bio is required"
                else if (trimmedValue.length > 70) return "Bio must be less than 70 characters long"
              }} />
              <h2 className="text-center pt-3 pb-1 font-semibold">Social Links</h2>
              <Input label="Facebook" name="facebook" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={facebook} />
              <Input label="Instagram" name="instagram" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={instagram} />
              <Input label="Linkedin" name="linkedIn" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={linkedIn} />
              <Input label="Twitter (X)" name="twitter" placeholder="https://" type="url" labelPlacement="outside" classNames={styles} defaultValue={twitter} />
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
