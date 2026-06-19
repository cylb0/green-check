import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

interface FeatureCardProps {
    title: string
    subtext: string
    className: string
    link: string
}

export default function FeatureCard({ title, subtext, link, className = "" }: FeatureCardProps) {
    const navigate = useNavigate()

    return (
        <div className={`flex flex-col justify-start border-2 border-primary/10 rounded-xl bg-primary/5 p-4 ${className}`}>
            <h1 className="text-heading">{title}</h1>
            <p className="text-subheading">{subtext}</p>
            <button onClick={() => navigate(link)} className="self-end text-primary active:text-primary/80">
                <FaArrowCircleRight size={32} />
            </button>
        </div>
    )
}