"use client"

import { useState, useEffect } from "react"
import CardWithImage from "@/components/blogcards/blogCard/CardWithImage"
import CardWithoutImage from "@/components/blogcards/blogCard/CardWithoutImage"
import { useSession } from "next-auth/react"
import { Input, Button, Link } from "@nextui-org/react"
import PageLoader from "../pageLoader/PageLoader"
import NoResults from "../noResults/NoResults"
import ErrorCard from "../errorcard/ErrorCard"

const FollowingBlogs = () => {
    const { data: session } = useSession()
    const [blogs, setBlogs] = useState<any[]>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchVal, setSearchVal] = useState("")

    const fetchFollowingBlogs = async () => {
        try {
            const res = await fetch("/api/following")
            if (!res.ok) throw new Error()
            const { data } = await res.json()
            setBlogs(data)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleRetry = () => {
        setLoading(true)
        setError(false)
        fetchFollowingBlogs()
    }

    useEffect(() => {
        fetchFollowingBlogs()
    }, [])

    const filteredBlogs = blogs.filter(e => {
        const searchTerm = searchVal.toLowerCase().trim()
        return !searchVal || e.title.toLowerCase().includes(searchTerm) || e.topic.toLowerCase().includes(searchTerm)
    });

    return (
        <div>
            <div className="flex items-center justify-center h-20 sticky top-[80px] bg-white z-50 border-b-1">
                <div className="w-9/12 flex justify-between">
                    <Input placeholder="Search" className="w-96" value={searchVal} onValueChange={setSearchVal} />
                    <div className="flex gap-2">
                        <Button as={Link} href="/all/allblogs" className="w-36 text-gray-800 bg-white border-1 border-gray-800">All</Button>
                        <Button as={Link} href="/all/following" className="w-36 text-white bg-gray-800">Following</Button>
                        <Button as={Link} href="/all/allusers" className="w-36 text-gray-800 bg-white border-1 border-gray-800">Users</Button>
                    </div>
                </div>
            </div>
            <div>
                {loading ? <PageLoader />
                    : error ? <ErrorCard retryFn={handleRetry} />
                        : filteredBlogs.length === 0 ? <NoResults />
                            : <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-20 mt-5">
                                {filteredBlogs.map(e => {
                                    if (e.imageUrl) return <CardWithImage
                                        id={e.id}
                                        userId={e.User.id}
                                        title={e.title}
                                        content={e.content}
                                        topic={e.topic}
                                        imageUrl={e.imageUrl}
                                        noOfLikes={e.likes.length}
                                        noOfComments={e.comments.length}
                                        userName={e.User.name}
                                        userImage={e.User.imageUrl}
                                        initialSaved={e.saved.some((e: any) => e.userId === session?.user.id)}
                                        dateOfCreation={new Date(e.createdAt)}
                                        key={e.id} />
                                    return <CardWithoutImage
                                        id={e.id}
                                        userId={e.User.id}
                                        title={e.title}
                                        content={e.content}
                                        topic={e.topic}
                                        noOfLikes={e.likes.length}
                                        noOfComments={e.comments.length}
                                        userName={e.User.name}
                                        userImage={e.User.imageUrl}
                                        initialSaved={e.saved.some((e: any) => e.userId === session?.user.id)}
                                        dateOfCreation={new Date(e.createdAt)}
                                        key={e.id}
                                    />
                                })}
                            </div>}
            </div>
        </div>
    )
}

export default FollowingBlogs
