"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react"
import FollowersCardMyProfile from "./followerscardmyprofile/FollowersCardMyProfile"
import { useState } from "react"

const FollowersModalMyProfile = ({
    followers
}: {
    followers: any;
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
            <p className="flex-1 text-center cursor-pointer" onClick={onOpen}><span className="font-bold text-2xl mr-2">{followers.length}</span>Followers</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" radius="sm" size="2xl" isKeyboardDismissDisabled={loading} isDismissable={!loading} hideCloseButton={loading}>
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{followers.length} Followers</ModalHeader>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                        <div className="h-[420px]">
                            {followers.length === 0 && <div className="h-[370px] flex justify-center items-center text-lg"><span>No followers</span></div>}
                            {followers.map((e: any) => <FollowersCardMyProfile key={e.id} enableLoading={handleEnableLoading} disableLoading={handleDisableLoading} loadingModal={loading} id={e.id} userId={e.FollowedBy.id} name={e.FollowedBy.name} imageUrl={e.FollowedBy.imageUrl} email={e.FollowedBy.email} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FollowersModalMyProfile