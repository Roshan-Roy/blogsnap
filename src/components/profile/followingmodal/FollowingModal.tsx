"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react"
import FollowingCard from "./followingcard/FollowingCard"

const FollowingModal = ({
    following
}: {
    following: any;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <p className="flex-1 text-center cursor-pointer" onClick={onOpen}><span className="font-bold text-2xl mr-2">{following.length}</span>Following</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" radius="sm" size="lg">
                <ModalContent className="pb-4">
                    <ModalHeader className="justify-center border-b-1">{following.length} Following</ModalHeader>
                    <ModalBody className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
                        <div className="h-[420px]">
                            {following.length === 0 && <div className="h-[370px] flex justify-center items-center text-lg"><span>No following</span></div>}
                            {following.map((e: any) => <FollowingCard key={e.id} id={e.id} name={e.name} imageUrl={e.imageUrl} email={e.email} />)}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FollowingModal