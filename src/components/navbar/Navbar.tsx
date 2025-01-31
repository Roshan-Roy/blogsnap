import Links from "./links/Links"
import links from "./linkList"
import { Dancing_Script } from "next/font/google"

const dancingScript = Dancing_Script({ subsets: ['latin'] })

const Navbar = () => {
    return (
        <>
            <div className="fixed h-20 border-b-1 w-full bg-white z-50">
                <div className="w-9/12 h-full mx-auto flex justify-between items-center">
                    <h2 className={`${dancingScript.className} text-2xl font-black`}>BlogSnap</h2>
                    <div className="flex gap-2">
                        {links.map(e => <Links key={e.id} icon={e.icon} routes={e.routes} />)}
                    </div>
                </div>
            </div>
            <div className="h-20"></div>
        </>
    )
}

export default Navbar