import GoogleSigninBtn from "@/components/google/GoogleSigninBtn"
import { auth } from "@/auth"
import LogOutBtn from "@/components/logout/LogoutBtn"

const Home = async () => {
  const session = await auth()
  return (
    <div className="flex gap-6 flex-col justify-center items-center h-[calc(100dvh-80px)]">
      {session ? <LogOutBtn /> : <GoogleSigninBtn />}
    </div>
  )
}

export default Home