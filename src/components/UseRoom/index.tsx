import React, { useEffect } from "react"
import io from "socket.io-client"
import { Tabs } from "antd"
import ChatRoom from "../ChatRoom"
import styles from "./index.module.scss"

interface Iprops {}

const socket = io("http://localhost:5200")

const friendMap: Record<string, string[]> = {
  john: ["jane", "james"],
  jane: ["john", "james", "Tom", "Jerry"],
  james: ["rose", "jane", "john"],
}

const UseRoom: React.FC<Iprops> = () => {
  const useId = new URLSearchParams(window.location.search).get("useId") ?? ""
  const [messages, setMessages] = React.useState<any[]>([])
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected")
      socket.emit("user_connected", useId)
    })

    socket.on("message", (msg) => {
      console.log("msg" + useId, msg)
      setMessages((messages) => [...messages, msg])
    })

    socket.on("disconnect", () => {
      socket.emit("user_disconnect", useId)
    })

    socket.on("online", (data) => {
      console.log("online", data)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Tabs className={styles.tabs} tabPosition="left">
        {friendMap?.[useId]?.map((name: string, index: number) => {
          return (
            <Tabs.TabPane tab={name} key={index}>
              <ChatRoom
                setMessages={setMessages}
                socket={socket}
                friendName={name}
                messages={messages}
              />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

export default UseRoom
