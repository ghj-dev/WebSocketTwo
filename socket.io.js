// TypeScript 语法支持通过 import 关键字导入模块
import express from "express"
import http from "http"
import { Server } from "socket.io"

// 创建一个新的 express application 和 HTTP 服务器
const app = express()
const httpServer = http.createServer(app)

// 创建一个新的 Socket.io 实例
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

const connections = {}

// 监听 'connection' 事件
io.on("connection", (socket) => {

  socket.on("user_connected", (userid) => {
    connections[userid] = socket
    console.log(userid + "连接成功")
    // socket.emit("online", connections)
  })

  socket.on("message", (msg) => {
    // io.emit("message", msg)
    // socket.emit("message", "Hello, Tom")
    const { to } = JSON.parse(msg || "{}")
    console.log("message", msg)
    connections[to].emit("message", JSON.parse(msg))
  })

  // io.on("disconnect", () => {
  //   io.emit("online", connections)
  // })

  socket.on("user_disconnect", (userid) => {
    console.log(userid + "断开连接")
    delete connections[userid]
    // socket.emit("online", connections)
  })
})

setInterval(() => {
  const onlineUserIds = Object.keys(connections);
  io.emit('online', onlineUserIds);
}, 2000)

// 启动 HTTP 服务器
httpServer.listen(5200, () => {
  console.log("listening on *:5200")
})
