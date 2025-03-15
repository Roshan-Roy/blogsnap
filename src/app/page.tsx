import GoogleSigninBtn from "@/components/google/GoogleSigninBtn"
import { auth } from "@/auth"
import LogOutBtn from "@/components/logout/LogoutBtn"
import { CSSProperties } from "react"
import Feedback from "@/components/feedback/Feedback"

const textStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-60%)",
  textTransform: "uppercase",
  fontFamily: "Verdana, sans-serif",
  fontSize: "160px",
  fontWeight: 900,
  color: "#f5f5f5",
  textShadow: `
    1px 1px 1px #919191,
    1px 2px 1px #919191,
    1px 3px 1px #919191,
    1px 4px 1px #919191,
    1px 5px 1px #919191,
    1px 6px 1px #919191,
    1px 7px 1px #919191,
    1px 8px 1px #919191,
    1px 9px 1px #919191,
    1px 10px 1px #919191,
    1px 18px 6px rgba(16,16,16,0.4),
    1px 22px 10px rgba(16,16,16,0.2),
    1px 25px 35px rgba(16,16,16,0.2),
    1px 30px 60px rgba(16,16,16,0.4)
  `,
}

const Home = async () => {
  const session = await auth()
  return (
    <>
      <div className="h-[calc(100dvh-180px)] bg-gray-200 relative">
        <h1 style={textStyle} className="text-center">BLOGSNAP</h1>
      </div>
      <div className="h-[100px] flex items-center justify-center">
        {session ? <LogOutBtn /> : <GoogleSigninBtn />}
      </div>
      {session && <Feedback />}
    </>
  )
}

export default Home
