import CardWithImage from "@/components/blogcards/blogCardMyProfile/CardWithImage"
import CardWithoutImage from "@/components/blogcards/blogCardMyProfile/CardWithoutImage"

const page = () => {
    return (
        <div className="w-7/12 mx-auto grid grid-cols-3 gap-4 mb-10">
            <CardWithImage />
            <CardWithoutImage />
            <CardWithImage />
        </div>
    )
}

export default page