import { useAuth } from "../../context/authContext";
import { FaUserCircle } from "react-icons/fa";

export default function Identity() {
    const { user } = useAuth()

    return (
        <div className="flex">
            <FaUserCircle size={40} />
            <p>{user?.email}</p>
        </div>
    )
}
