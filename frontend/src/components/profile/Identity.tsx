import { useAuth } from "@/context";
import { FaRegUser } from "react-icons/fa";

export default function Identity() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col items-center gap-2 my-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                <FaRegUser size={24} className="text-on-primary" />
            </div>
            <p className="title-sm text-ink-inverse font-semibold">{user?.email}</p>
        </div>
    )
}