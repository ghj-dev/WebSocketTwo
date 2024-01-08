import { Button, Input } from "antd"
import React, { useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"

interface Iprops {}

const actionMap: Record<string, any> = {
  draw: "draw",
  eraser: "eraser",
}

// let canvas: HTMLCanvasElement = null
let ctx: any
const Canvas: React.FC<Iprops> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawColor, setDrawColor] = useState("black")
  const [action, setAction] = useState("draw")

  useEffect(() => {
    setTimeout(() => {
      console.log("gtgregregfer", canvasRef)
      if (!canvasRef.current) return
      ctx = canvasRef.current.getContext("2d")
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      let drawing = false // 状态变量，表示是否正在绘图

      canvasRef.current.addEventListener("mousedown", () => {
        drawing = true
        // 开始新的路径
        ctx.beginPath()
      })

      canvasRef.current.addEventListener("mousemove", (event) => {
        // 只有当drawing为true（即鼠标按下状态）时，才进行绘图
        const left = canvasRef.current?.offsetLeft ?? 0
        const top = canvasRef.current?.offsetTop ?? 0
        if (drawing) {
          ctx.lineTo(event.clientX - left, event.clientY - top + 10)
          ctx.stroke()
        }
      })

      canvasRef.current.addEventListener("mouseup", () => {
        drawing = false
      })
    }, 500)
  }, [])

  const handleOnColorChange = (e: any) => {
    if (action === "eraser") return
    ctx.strokeStyle = e.target.value
    setDrawColor(e.target.value)
  }

  const handeOnSave = () => {
    const url: any = canvasRef.current?.toDataURL("image/jpeg", 1.0)
    navigator.clipboard.writeText(url)
  }

  const handleOnDraw = () => {
    ctx.strokeStyle = drawColor
    ctx.lineWidth = 2
    setAction("draw")
  }

  const handleOnEraser = () => {
    ctx.strokeStyle = "white"
    ctx.lineWidth = 30
    setAction("eraser")
  }

  return (
    <div className={styles.container}>
      <div>
        <span>画布</span>
        <div>
          <span>画笔颜色</span>
          <Input
            style={{ width: 100 }}
            onChange={handleOnColorChange}
            type="color"
          />
          <Button onClick={handeOnSave}>保存</Button>
          <Button onClick={handleOnDraw}>画笔</Button>
          <Button onClick={handleOnEraser}>橡皮擦</Button>
        </div>
      </div>
      <canvas
        style={{ border: "1px solid #000" }}
        className={styles[actionMap[action]]}
        ref={canvasRef}
        id="drawArea"
        width="800"
        height="600"
      />
    </div>
  )
}

export default Canvas
