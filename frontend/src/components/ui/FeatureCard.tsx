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
            rounded-3xl bg-gradient-to-br from-pine-800 to-primary
            shadow-lg shadow-primary-light/20 p-5 ${className}`}
        >
            <div className="absolute w-24 h-24 rounded-full bg-paper/10 -top-8 -right-5" aria-hidden="true" />
            <h1 className="relative text-heading text-ink-inverse">{title}</h1>
            <p className="relative text-subheading text-ink-inverse/75">{subtext}</p>
            <button
                onClick={() => navigate(link)}
                className="relative self-start mt-3 w-9 h-9 rounded-xl bg-paper flex items-center justify-center
                    transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-90"
            >
                <FaArrowRight size={20} className="text-pine-800" />
            </button>
        </div>
    )
}
