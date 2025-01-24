"use client"

import Link from "next/link"
import Links from "./links/Links"
import links from "./linkList"

const ProfileNavbar = () => {

    return (
        <div className="w-7/12 mx-auto flex h-12 mt-11">
            <div className="flex-1 border-t-2"></div>
            {links.map(e => <Links key={e.id} name={e.name} route={e.route} icon={e.icon} />)}
            <div className="flex-1 border-t-2"></div>
        </div>
    )
}

export default ProfileNavbar