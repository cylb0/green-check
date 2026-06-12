import type { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-between border-2 border-primary/10 rounded-xl bg-primary/5 gap-2 px-4 py-4 ${className}`}>
            {children}
        </div>
    )
}
