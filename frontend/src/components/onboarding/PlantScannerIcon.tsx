import { PiPlantLight } from "react-icons/pi";

export default function PlantScannerIcon() {
    const cornerStyle = "absolute border-primary/40 size-6"

    return (
        <div className="relative inline-flex items-center justify-center p-12">
            <div className="absolute top-[25%] bottom-[25%] left-[30%] right-[20%] bg-primary/20 rounded-xl" />
            <div className={`${cornerStyle} top-[20%] left-[25%] border-t-2 border-l-2 rounded-tl-xl`} />
            <div className={`${cornerStyle} top-[20%] right-[25%] border-t-2 border-r-2 rounded-tr-xl`} />
            <div className={`${cornerStyle} bottom-[30%] left-[25%] border-b-2 border-l-2 rounded-bl-xl`} />
            <div className={`${cornerStyle} bottom-[30%] right-[25%] border-b-2 border-r-2 rounded-br-xl`} />
            <PiPlantLight size={180} className="text-primary" />
        </div>
    )
}