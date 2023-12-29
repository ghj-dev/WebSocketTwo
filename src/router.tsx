import { createBrowserRouter } from "react-router-dom"
import UseRoom from "./components/UseRoom"

export const router = createBrowserRouter([
  {
    // 发布规则管理
    path: "/useroom",
    element: <UseRoom />,
  },
])
