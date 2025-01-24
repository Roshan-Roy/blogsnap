import { AiOutlineHome } from "react-icons/ai"
import { RiFileList2Line } from "react-icons/ri"
import { IoMdAddCircleOutline } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"

const links = [
  {
    id: 1,
    routes: ["/"],
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    routes: ["#"],
    icon: <IoMdAddCircleOutline />
  },
  {
    id: 3,
    routes: ["/all"],
    icon: <RiFileList2Line />
  },
  {
    id: 4,
    routes: ["/myprofile", "/myprofile/saved"],
    icon: <FaRegUser />
  }
];

export default links;
