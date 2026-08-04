import type { ReactNode } from "react";

export default function CaptureLabel({ children }: { children: ReactNode }) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-52">
            <div className="bg-primary rounded-field px-4 py-3 text-white body text-center leading-snug">
                {children}
            </div>
        </div>        
    )
}