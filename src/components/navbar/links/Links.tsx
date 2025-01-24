"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

const Links = ({
    icon,
    routes
}: {
    icon: React.ReactElement;
    routes: string[];
}) => {
    const pathName = usePathname()
    return <Link href={routes[0]} onClick={() => {
        if (routes[0] === "#")
            alert("Clicked")
    }} className={`block text-xl p-3 rounded-full cursor-pointer ${routes.includes(pathName) && "bg-gray-800 text-white"} ${!routes.includes(pathName) && "hover:bg-gray-200"}`}>{icon}</Link>
}

export default Links