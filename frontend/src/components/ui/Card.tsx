import type { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-between
            rounded-2xl bg-paper/20 backdrop-blur-md border border-paper/60
            shadow-sm gam-2 p-4
            transition-all duration-150
            ${className}`}
        >
            {children}
        </div>
    )
}
