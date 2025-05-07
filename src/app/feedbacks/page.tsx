import { db } from "@/lib/db"
import FeedbackCard from "@/components/feedbackCard/FeedbackCard"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import NoResultsFeedback from "@/components/noResults/NoResultsFeedback"

const page = async () => {
  const session = await auth()
  const isAdmin = session?.user.isAdmin
  if (!isAdmin) redirect("/")
  try {
    const feedbacks = await db.feedback.findMany({
      include: {
        User: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return (
      feedbacks.length === 0 ? <NoResultsFeedback /> :
        <div className="w-7/12 mx-auto flex flex-col gap-4 mt-4 mb-10">
          {feedbacks.map(e => <FeedbackCard key={e.id} title={e.title} message={e.message} email={e.User?.email as string} />)}
        </div>
    )
  } catch {
    throw new Error("Something went wrong")
  }

}

export default page