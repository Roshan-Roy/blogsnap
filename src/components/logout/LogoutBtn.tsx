"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"
import { IoMdLogOut } from "react-icons/io"
import { Link } from "@nextui-org/react"
import { Button } from "@nextui-org/react"

const LogOutBtn = () => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(true)
        if (!clicked)
            signOut()
    }
    return (
        <div className="flex gap-2">
            <Button href="/all/allblogs" as={Link} size="lg" disableRipple radius="full" className="w-44 bg-gray-800 text-white">All blogs</Button>
            <Button
                className="gap-4 w-44 bg-gray-800 text-white"
                isLoading={clicked}
                onPress={handleClick}
                radius="full"
                size="lg"
                startContent={!clicked && <IoMdLogOut className="text-xl"/>}
                disableRipple>
                Logout
            </Button>
        </div>
    )
}

export default LogOutBtn