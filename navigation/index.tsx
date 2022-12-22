import { Navigation } from "../@types/Navigation"
import { Dashboard, LibraryBooks, CloudUpload } from "@mui/icons-material"

const NavigationItems: Navigation = [
    {
        id: 0,
        title: "Dashboard",
        link: "/",
        icon: <Dashboard sx={{fill: "#1976d2"}}/>,
        isActive: true,
      },
      {
        id: 1,
        title: "Books",
        link: "/books",
        icon: <LibraryBooks sx={{fill: "#1976d2"}}/>,
        isActive: false,
      },
      {
        id: 2,
        title: "Upload",
        link: "/upload",
        icon: <CloudUpload sx={{fill: "#1976d2"}}/>,
        isActive: false,
      },
]

export default NavigationItems