import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title?: string
    className?: string
}

export default function PageHeader({ title, className }: PageHeaderProps) {
    const navigate = useNavigate()
    
    return (
        <div className={`grid grid-cols-[auto_1fr_auto] items-center w-full p-4 ${className}`}>
            <button
                onClick={() => navigate("/")}
                className="justify-self-start active:scale-110 hover:scale-110"
            >
                <FaArrowLeft size={24} />
            </button>

            <h1 className="text-heading text-center">
                {title}
            </h1>

            <div className="w-8" /> 
        </div>
    )
}