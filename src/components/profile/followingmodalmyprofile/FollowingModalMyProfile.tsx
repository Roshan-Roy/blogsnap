"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react"
import FollowingCardMyProfile from "./followingcardmyprofile/FollowingCardMyProfile"
import { useState } from "react"

const FollowingModalMyProfile = ({
    following
}: {
    following: any;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const handleEnableLoading = () => {
        setLoading(true)
    }
    const handleDisableLoading = () => {
        setLoading(false)
    }
    return (
        <>
            <p className="flex-1 text-center cursor-pointer" onClick={onOpen}><span className="font-bold text-2xl mr-2">{following.length}</span>Following</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" radius="sm" size="2xl" isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{following.length} Following</ModalHeader>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                        <div className="h-[420px]">
                            {following.length === 0 && <div className="h-[370px] flex justify-center items-center text-lg"><span>No following</span></div>}
                            {following.map((e: any) => <FollowingCardMyProfile key={e.id} enableLoading={handleEnableLoading} disableLoading={handleDisableLoading} loadingModal={loading} id={e.id} userId={e.Follows.id} name={e.Follows.name} imageUrl={e.Follows.imageUrl} email={e.Follows.email} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FollowingModalMyProfile