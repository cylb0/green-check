import { gardenBg } from "@/assets"
import { useEffect } from "react"

export default function GardenBackGround() {

    useEffect(() => {
        console.log('mount bg')
    }, [])
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center [transform:translateZ(0)] [will-change:transform]"
            aria-hidden="true"
        >
            <img src={gardenBg} alt="" className="w-full h-full object-cover" />
        </div>
    )
}
