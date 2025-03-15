import { FiGrid } from "react-icons/fi"
import { FaRegBookmark } from "react-icons/fa"

const links = [
  {
    id: 1,
    name: "BLOGS",
    route: "/myprofile",
    icon: <FiGrid />,
  },
  {
    id: 2,
    name: "SAVED",
    route: "/myprofile/saved",
    icon: <FaRegBookmark />
  },
];

export default links
