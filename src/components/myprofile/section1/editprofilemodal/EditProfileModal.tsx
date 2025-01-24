"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react"

import { useState } from "react"

export default function EditProfileModal({
  name,
  bio,
  whatsapp,
  facebook,
  instagram,
  linkedIn
}: {
  name: string;
  bio?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  linkedIn?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues] = useState({
    name,
    bio,
    whatsapp,
    facebook,
    instagram,
    linkedIn
  })
  const styles = {
    input: [
      "placeholder:text-xs"
    ]
  }
  const handleModalClose = () => {
    setValues({
      name,
      bio,
      whatsapp,
      facebook,
      instagram,
      linkedIn
    })
  }
  const handleFormSubmit = async () => {
    try {
      const res = await fetch('/api/editprofile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          bio: values.bio,
          whatsapp: values.whatsapp,
          facebook: values.facebook,
          instagram: values.instagram,
          linkedIn: values.linkedIn
        })
      });
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error)
      }
      const data = await res.json()
      console.log("success", data.data)
    } catch (e: any) {
      console.log("error", e.message)
    }
  }
  return (
    <>
      <Button onPress={onOpen} size="sm" className="px-7 font-semibold bg-gray-800 text-white" disableRipple>Edit Profile</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleModalClose} scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="justify-center">Edit profile</ModalHeader>
          <ModalBody className="gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
            <Input label="Name" type="text" labelPlacement="outside" placeholder="Enter your name" classNames={styles} value={values.name} onValueChange={value => setValues(e => ({ ...e, name: value }))} />
            <Input label="Bio" placeholder="Enter your bio" type="text" labelPlacement="outside" classNames={styles} value={values.bio} onValueChange={value => setValues(e => ({ ...e, bio: value }))} />
            <h2 className="text-center pt-3 pb-1 font-semibold">Social Links</h2>
            <Input label="Whatsapp" placeholder="https://" type="text" labelPlacement="outside" classNames={styles} value={values.whatsapp} onValueChange={value => setValues(e => ({ ...e, whatsapp: value }))} />
            <Input label="Facebook" placeholder="https://" type="text" labelPlacement="outside" classNames={styles} value={values.facebook} onValueChange={value => setValues(e => ({ ...e, facebook: value }))} />
            <Input label="Instagram" placeholder="https://" type="text" labelPlacement="outside" classNames={styles} value={values.instagram} onValueChange={value => setValues(e => ({ ...e, instagram: value }))} />
            <Input label="Linkedin" placeholder="https://" type="text" labelPlacement="outside" classNames={styles} value={values.linkedIn} onValueChange={value => setValues(e => ({ ...e, linkedin: value }))} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleFormSubmit} className="bg-gray-800 font-semibold text-xs px-12" disableRipple>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
