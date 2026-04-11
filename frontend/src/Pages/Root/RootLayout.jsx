import { Outlet } from "react-router-dom"
import Menu from "../../components/Menu/Menu"

export default function RootLayout() {
  return (
    <>
        <Menu />
        <Outlet />
    </>
  )
}