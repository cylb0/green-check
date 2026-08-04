import type { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-between
            rounded-card glass gap-2 p-4
            transition-colors duration-150
            ${className}`}
        >
            {children}
        </div>
    )
}
