import { FaRegBell } from "react-icons/fa";

interface AlertsProps {
    hasAlerts: boolean
}

export default function Alerts({ hasAlerts }: AlertsProps) {
    return (
        <button
            className="relative h-8 w-8 flex items-center justify-center
                rounded-control glass
                transition duration-150
                hover:-translate-y-0.5
                active:translate-y-0 active:scale-90"
        >
            <FaRegBell size={22} className="text-parchment-400" />
            {hasAlerts && (
                <span
                    className="absolute top-1 right-1 h-2 w-2 rounded-full bg-severity-high-text
                        ring-2 ring-parchment-200 motion-safe:animate-ping"
                />
            )}
        </button>
    )
}
