import ReactDOM from "react-dom/client"

import "./index.css"
import { App, ConfigProvider } from "antd"
import { StyleProvider } from "@ant-design/cssinjs"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider autoInsertSpaceInButton={false}>
    <StyleProvider hashPriority="high">
      <App>
        <RouterProvider router={router} />
      </App>
    </StyleProvider>
  </ConfigProvider>
)
