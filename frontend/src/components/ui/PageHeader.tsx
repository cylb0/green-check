import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title?: string
    className?: string
    to?: string
}

export default function PageHeader({ title, className, to }: PageHeaderProps) {
    const navigate = useNavigate()

    const handleBack = () => {
        if (to) {
            navigate(to)
        } else {
            navigate(-1)
        }
    }
    
    return (
        <div className={`grid grid-cols-[auto_1fr_auto] items-center w-full p-4 ${className}`}>
            <button
                onClick={handleBack}
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