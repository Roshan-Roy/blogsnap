import GoogleSigninBtn from "@/components/google/GoogleSigninBtn"
import { auth } from "@/auth"
import LogOutBtn from "@/components/logout/LogoutBtn"

const Home = async () => {
  const session = await auth()
  return (
    <div className="flex gap-6 flex-col h-dvh justify-center items-center bg-gray-100">
      {session ? <LogOutBtn /> : <GoogleSigninBtn />}
    </div>
  )
}

export default Home