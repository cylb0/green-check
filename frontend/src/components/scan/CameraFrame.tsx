import { forwardRef } from "react"

export const CameraFrame = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-primary"
    style={{
      width: '75vw',
      height: '75vw',
      boxShadow: '0 0 0 100vmax rgba(0,0,0,0.65)',
    }}
  />
))

export default CameraFrame
