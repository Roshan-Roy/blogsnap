"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import CreateBlogModal from "@/components/createblogmodal/CreateBlogModal"

const Links = ({
    icon,
    routes
}: {
    icon: React.ReactElement;
    routes: string[];
}) => {
    const pathName = usePathname()
    if (routes[0] === "#") return <CreateBlogModal icon={icon}/>
    return <Link href={routes[0]} className={`block text-xl p-3 rounded-full cursor-pointer ${routes.includes(pathName) && "bg-gray-800 text-white"} ${!routes.includes(pathName) && "hover:bg-gray-200"}`}>{icon}</Link>
}

export default Links