import { useAuth } from "@/context";
import { FaRegUser } from "react-icons/fa";

export default function Identity() {
    const { user } = useAuth()

    return (
        <div className="flex justify-center items-center gap-2 my-6">
            <FaRegUser size={64} className="self-center bg-primary/20 rounded-full text-primary p-4 overflow-visible" />
            <p className="text-subheading">{user?.email}</p>
        </div>
    )
}
