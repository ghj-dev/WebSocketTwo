import { Button, Form, Input } from "antd"
import React, { useEffect } from "react"
import dayjs from "dayjs"
import styles from "./index.module.scss"

interface Iprops {
  friendName: string
  messages: any[]
  socket: any
  setMessages: Function
}
const ChatRoom: React.FC<Iprops> = ({
  friendName,
  messages,
  socket,
  setMessages,
}) => {
  const useId = new URLSearchParams(window.location.search).get("useId") ?? ""
  const [roomMsg, setRoomMsg] = React.useState<any[]>([])
  const [form] = Form.useForm()
  useEffect(() => {
    const data = messages?.filter(
      (item) =>
        (item?.from === useId && item?.to === friendName) ||
        (item?.from === friendName && item?.to === useId)
    )
    setRoomMsg(data)
  }, [messages])

  const handleOnSendMsg = () => {
    const msg = form.getFieldValue("msg")
    if (!msg) return
    const data = {
      from: useId,
      to: friendName,
      msg,
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }
    socket.emit("message", JSON.stringify(data))
    // setRoomMsg([...roomMsg, data])
    setMessages([...messages, data])
    form.resetFields()
  }
  console.log("fregtrgrtger", messages)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {roomMsg?.map((item, index: number) => {
          return (
            <div key={index}>
              <p>{item.from}:</p>
              <p
                style={{
                  marginLeft: 16,
                  color: item.from === useId ? "red" : "",
                }}
              >
                {item.msg}
              </p>
            </div>
          )
        })}
      </div>
      <Form autoComplete="off" className={styles.form} form={form}>
        <Form.Item name="msg">
          <Input onPressEnter={handleOnSendMsg} />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleOnSendMsg} type="primary">
            发送
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChatRoom
