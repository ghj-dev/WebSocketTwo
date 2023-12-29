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
  console.log("a user connected")

  socket.on("user_connected", (userid) => {
    connections[userid] = socket
  })

  socket.on("chat message", (msg) => {
    console.log("chat message: " + msg)
    io.emit("message", msg)
    socket.emit("message", "Hello, Tom")
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

// 启动 HTTP 服务器
httpServer.listen(5200, () => {
  console.log("listening on *:5200")
})
