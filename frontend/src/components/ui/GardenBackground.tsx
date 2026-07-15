import { gardenBg } from "@/assets"

export default function GardenBackground() {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        >
            <img src={gardenBg} alt="" className="w-full h-full object-cover" />
        </div>
    )
}
