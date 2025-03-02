"use client"

import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@nextui-org/react"

const FollowBtn = ({
    id,
    initialFollowing
}: {
    id: string;
    initialFollowing: Boolean;
}) => {
    const { data: session } = useSession()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [following, setFollowing] = useState(initialFollowing)

    const handleFollowBtnClick = async () => {
        setLoading(true)
        const res = await fetch(`/api/follow/${session?.user.id}`, {
            method: 'POST',
            body: JSON.stringify({ id })
        })
        if (res.ok) {
            setFollowing(true)
            router.refresh()
        }
        setLoading(false)
    }
    const handleUnfollowBtnClick = async () => {
        setLoading(true)
        const res = await fetch(`/api/unfollow/${session?.user.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id })
        })
        if (res.ok) {
            setFollowing(false)
            router.refresh()
        }
        setLoading(false)
    }
    return following ? <Button variant="bordered" className="font-semibold text-xs w-32 h-full border-gray-800" onPress={() => {
        if (!loading) handleUnfollowBtnClick()
    }} disableRipple>{loading ? <Spinner size="sm" color="default" /> : "Following"}</Button> :
        <Button color="primary" className="bg-gray-800 font-semibold text-xs w-32 h-full" onPress={() => {
            if (!loading) handleFollowBtnClick()
        }} disableRipple>{loading ? <Spinner size="sm" color="default" /> : "Follow"}</Button>
}

export default FollowBtn