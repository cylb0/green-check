interface PillProps {
    text: string
    className?: string
}

export default function Pill({ text, className = "" }: PillProps) {
    return (
        <div className={`rounded-full text-foreground px-4 py-1 ${className}`}>
            {text}
        </div>
    )
}