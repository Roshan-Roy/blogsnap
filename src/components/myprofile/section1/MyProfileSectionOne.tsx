import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa"
import EditProfileModal from "./editprofilemodal/EditProfileModal"
import { db } from "@/lib/db"
import { auth } from "@/auth"


const MyProfileSectionOne = async () => {
    const session = await auth()
    try {
        const user = await db.user.findUnique({
            where: {
                id: session?.user.id
            }
        })
        return (
            <div className="flex w-5/12 mx-auto justify-center gap-12 mt-10">
                <div className="relative w-56 h-56">
                    <Image fill={true} src="/user.png" alt="No profile picture" className="rounded-full" />
                </div>
                <div className="flex-1 flex flex-col gap-5 text-lg">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{user?.name}</h1>
                        <EditProfileModal
                            name={user?.name as string}
                            bio={user?.bio}
                            whatsapp={user?.whatsapp}
                            facebook={user?.facebook}
                            instagram={user?.instagram}
                            linkedIn={user?.linkedIn}
                        />
                    </div>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <div className="flex justify-between">
                        <p className="flex-1"><span className="font-bold text-2xl mr-2">0</span>Posts</p>
                        <p className="flex-1 text-center"><span className="font-bold text-2xl mr-2">0</span>Followers</p>
                        <p className="flex-1 text-right"><span className="font-bold text-2xl mr-2">0</span>Following</p>
                    </div>
                    <p className="leading-8 text-gray-600">{user?.bio}</p>
                    <div className="flex text-2xl gap-5 mt-2">
                        <Link href={user?.whatsapp ? user.whatsapp : "#"}><FaWhatsapp className={`${user?.whatsapp ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.whatsapp ? user.facebook : "#"}><FaFacebook className={`${user?.facebook ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.whatsapp ? user.instagram : "#"}><FaInstagram className={`${user?.instagram ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.whatsapp ? user.linkedIn : "#"}><FaLinkedin className={`${user?.linkedIn ? "opacity-100" : "opacity-10"}`} /></Link>
                    </div>
                </div>
            </div>
        )
    } catch (e: any) {
        throw new Error("Something went wrong")
    }

}

export default MyProfileSectionOne