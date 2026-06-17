import { useAuth } from "../../context/authContext";
import { PiUserCircle } from "react-icons/pi";

export default function Identity() {
    const { user } = useAuth()

    return (
        <div className="flex items-center my-6">
            <PiUserCircle size={80} className="text-primary" />
            <p className="text-subheading">{user?.email}</p>
        </div>
    )
}
