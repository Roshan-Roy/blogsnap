import MyProfile from "@/components/myprofile/MyProfile"
import ProfileNavbar from "@/components/profilenavbar/ProfileNavbar"
import { Suspense } from "react"
import ProfileSuspense from "@/components/suspenses/ProfileSuspense"

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Suspense fallback={<ProfileSuspense />}>
                <MyProfile />
            </Suspense>
            <ProfileNavbar />
            {children}
        </>
    );
}

export default layout
