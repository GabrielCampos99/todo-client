import { FiUser, FiTrello, FiLogOut } from "react-icons/fi"
import { routesPath } from "./routes"

type TSidebarData = {
  path?: string
  icon: any
  title: string
  color?: string
  cName?: string
}

export const SidebarData: TSidebarData[] = [
  {
    title: "Usuário",
    path: routesPath.user,
    icon: <FiUser />,
  },
  {
    title: "Tarefas",
    path: routesPath.tasks,
    icon: <FiTrello />,
  }
]
