import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import EditProfileModal from "./editprofilemodal/EditProfileModal"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import FollowingModalMyProfile from "../profile/followingmodalmyprofile/FollowingModalMyProfile"
import FollowersModalMyProfile from "../profile/followersmodalmyprofile/FollowersModalMyProfile"

const MyProfile = async () => {
    const session = await auth()
    try {
        const user = await db.user.findUnique({
            where: {
                id: session?.user.id
            },
            include: {
                following: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        Follows: true
                    }
                },
                followers: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        FollowedBy: true
                    }
                },
                blogs: true
            }
        })
        return (
            <div className="flex w-5/12 mx-auto justify-center gap-12 mt-10">
                <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gray-100">
                    <Image unoptimized={false} fill={true} src={user?.imageUrl ? user.imageUrl : "/user.png"} alt="No profile picture" />
                </div>
                <div className="flex-1 flex flex-col gap-5 text-lg">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{user?.name}</h1>
                        <EditProfileModal
                            id={user?.id as string}
                            imageUrl={user?.imageUrl as string}
                            name={user?.name as string}
                            bio={user?.bio as string}
                            facebook={user?.facebook as string}
                            instagram={user?.instagram as string}
                            linkedIn={user?.linkedIn as string}
                            twitter={user?.twitter as string}
                        />
                    </div>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <div className="flex justify-between">
                        <p className="flex-1"><span className="font-bold text-2xl mr-2">{user?.blogs.length}</span>Posts</p>
                        <FollowersModalMyProfile followers={user?.followers} />
                        <FollowingModalMyProfile following={user?.following} />
                    </div>
                    <p className="leading-8 text-gray-600">{user?.bio}</p>
                    <div className="flex text-2xl gap-5 mt-2">
                        <Link href={user?.facebook ? user.facebook : "#"}><FaFacebook className={`${user?.facebook ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.instagram ? user.instagram : "#"}><FaInstagram className={`${user?.instagram ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.linkedIn ? user.linkedIn : "#"}><FaLinkedin className={`${user?.linkedIn ? "opacity-100" : "opacity-10"}`} /></Link>
                        <Link href={user?.twitter ? user.twitter : "#"}><FaXTwitter className={`${user?.twitter ? "opacity-100" : "opacity-10"}`} /></Link>
                    </div>
                </div>
            </div>
        )
    } catch {
        throw new Error("Something went wrong")
    }

}

export default MyProfile