import Link from "next/link"
import { usePathname } from "next/navigation";

const Links = ({ name, route, icon }: {
    name: string;
    route: string;
    icon: React.ReactNode;
}) => {
    const pathName = usePathname()
    return (
        <Link href={route} className={`basis-28 flex justify-center items-center gap-2 text-sm ${pathName === route ? "text-gray-800 border-t-3 border-gray-700" : "text-gray-400 border-t-2"}`}>
            {icon}
            <span className="text-c">{name}</span>
        </Link>
    )
}

export default Links