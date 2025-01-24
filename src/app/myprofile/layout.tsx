import MyProfileSectionOne from "@/components/myprofile/section1/MyProfileSectionOne"
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
                <MyProfileSectionOne />
            </Suspense>
            <ProfileNavbar />
            {children}
        </>
    );
}

export default layout
