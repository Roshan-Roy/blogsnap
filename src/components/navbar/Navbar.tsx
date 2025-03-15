import Links from "./links/Links"
import { links, linksLoggedIn } from "./linkList"
import { Dancing_Script } from "next/font/google"
import { auth } from "@/auth"
import { VscFeedback } from "react-icons/vsc";

const dancingScript = Dancing_Script({ subsets: ['latin'] })

const Navbar = async () => {
    const session = await auth()
    return (
        <>
            <div className="fixed h-20 border-b-1 w-full bg-white z-50">
                <div className="w-9/12 h-full mx-auto flex justify-between items-center">
                    <h2 className={`${dancingScript.className} text-2xl font-black`}>BlogSnap</h2>
                    <div className="flex gap-2">
                        {session ? linksLoggedIn.map(e => <Links key={e.id} icon={e.icon} routes={e.routes} />) : links.map(e => <Links key={e.id} icon={e.icon} routes={e.routes} />)}
                        {session?.user.isAdmin && <Links icon={<VscFeedback />} routes={["/feedbacks"]} />}
                    </div>
                </div>
            </div>
            <div className="h-20"></div>
        </>
    )
}

export default Navbar