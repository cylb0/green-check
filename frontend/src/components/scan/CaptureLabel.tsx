import type { ReactNode } from "react";

export default function CaptureLabel({ children }: { children: ReactNode }) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-52">
            <div className="bg-primary rounded-2xl px-5 py-3 text-white text-sm text-center leading-snug">
                {children}
            </div>
        </div>        
    )
}