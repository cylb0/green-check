import { HEADER_CONTENT } from "../../data/homePage";

export default function Welcome({ className }: { className?: string }) {
    return (
        <div className={`fex flex-col ${className}`}>
            <h1 className="text-heading">{HEADER_CONTENT.title}</h1>
            <p className="text-subheading">{HEADER_CONTENT.subtext}</p>
        </div>
    )
}
