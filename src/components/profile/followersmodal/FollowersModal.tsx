"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react"
import FollowerCard from "./followercard/FollowerCard"

const FollowersModal = ({
    followers
}: {
    followers: any;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <p className="flex-1 text-center cursor-pointer" onClick={onOpen}><span className="font-bold text-2xl mr-2">{followers.length}</span>Followers</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" radius="sm" size="lg">
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{followers.length} {followers.length <= 1 ? "Follower" : "Followers"}</ModalHeader>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                        <div className="h-[420px]">
                            {followers.map((e: any) => <FollowerCard key={e.id} id={e.id} name={e.name} imageUrl={e.imageUrl} email={e.email} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FollowersModal