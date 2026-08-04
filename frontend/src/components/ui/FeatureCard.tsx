import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

interface FeatureCardProps {
    title: string
    subtext: string
    className?: string
    link: string
}

export default function FeatureCard({ title, subtext, link, className = "" }: FeatureCardProps) {
    const navigate = useNavigate()

    return (
        <div className={`relative overflow-hidden flex flex-col justify-start
            rounded-hero bg-gradient-to-br from-emerald-800 to-primary p-5 ${className}`}
        >
            <div className="absolute w-24 h-24 rounded-full bg-parchment-200/10 -top-8 -right-4" aria-hidden="true" />
            <h1 className="relative title-lg text-ink-inverse">{title}</h1>
            <p className="relative title-sm text-ink-inverse/75">{subtext}</p>
            <button
                onClick={() => navigate(link)}
                className="relative self-start mt-3 w-9 h-9 rounded-full bg-parchment-50 flex items-center justify-center
                    transition duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-90"
            >
                <FaArrowRight size={20} className="text-emerald-800" />
            </button>
        </div>
    )
}
