import { IoImagesOutline, IoRefreshOutline } from "react-icons/io5"

interface CaptureControlsProps {
    onCapture: () => void
    onToggleCamera: () => void
}

export default function CaptureControls({ onCapture, onToggleCamera }: CaptureControlsProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-8 pb-12 pt-4">
            <button className="text-white/30 active:text-white hover:text-white transition-colors duration-300">
                <IoImagesOutline size={28} />
            </button>

            <button
                onClick={onCapture}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform"
            >
                <div className="w-17 h-17 rounded-full bg-primary" />
            </button>

            <button
                onClick={onToggleCamera}
                className="text-white/30 active:text-white hover:text-white transition-colors duration-300"
            >
                <IoRefreshOutline size={28} />
            </button>
        </div>
    )
}
