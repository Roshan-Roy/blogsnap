"use client"

import { useState, useEffect } from "react"
import { Input, Button, Link } from "@nextui-org/react"
import UserCard from "../usercard/UserCard"

const AllUsers = () => {
    const [users, setUsers] = useState<any[]>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchVal, setSearchVal] = useState("")

    const fetchAllUsers = async () => {
        try {
            const res = await fetch("/api/allusers")
            if (!res.ok) throw new Error()
            const { data } = await res.json()
            setUsers(data)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])

    const filteredUsers = users.filter(e => {
        const searchTerm = searchVal.toLowerCase().trim()
        return !searchVal || e.email.toLowerCase().startsWith(searchTerm) || e.name.toLowerCase().includes(searchTerm)
    });

    return (
        <div>
            <div className="flex items-center justify-center h-20 sticky top-[80px] bg-white z-50 border-b-1">
                <div className="w-9/12 flex justify-between">
                    <Input placeholder="Search" className="w-96" value={searchVal} onValueChange={setSearchVal} />
                    <div className="flex gap-2">
                        <Button as={Link} href="/all/allblogs" className="w-36 text-gray-800 bg-white border-1 border-gray-800">All</Button>
                        <Button as={Link} href="/all/following" className="w-36 text-gray-800 bg-white border-1 border-gray-800">Following</Button>
                        <Button as={Link} href="/all/allusers" className="w-36 text-white bg-gray-800">Users</Button>
                    </div>
                </div>
            </div>
            <div>
                {loading ? <p>Loading</p> : error ? <div>
                    <p>Something went wrong</p>
                    <Button onPress={() => {
                        setLoading(true)
                        setError(false)
                        fetchAllUsers()
                    }}>Try Again</Button>
                </div> : <div className="w-7/12 mx-auto flex flex-col gap-4 mb-20 mt-5">
                    {filteredUsers.map(e => <UserCard key={e.id} {...e} />)}
                    {filteredUsers.length === 0 && <p>No results</p>}
                </div>}
            </div>
        </div>
    )
}

export default AllUsers
