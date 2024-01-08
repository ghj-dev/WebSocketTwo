import { createBrowserRouter } from "react-router-dom"
import UseRoom from "./components/UseRoom"
import Canvas from "./components/Canvas"

export const router = createBrowserRouter([
  {
    // 发布规则管理
    path: "/useroom",
    element: <UseRoom />,
  },
  {
    // 发布规则管理
    path: "/canvas",
    element: <Canvas />,
  },
])
