import { useState } from "react";
import { useAuthNav } from "../../context/authNavContext";

export default function DotAuthNav() {
    const { goTo, step } = useAuthNav()
    const [hoveredDot, setHoveredDot] = useState<number | null>(null)

    return (
        <div className="flex gap-2 mt-12">
            {[0, 1, 2].map((_, i) => (
                <button
                    key={i}
                    onClick={() => goTo(i)}
                    onTouchStart={() => setHoveredDot(i)}
                    onTouchEnd={() => setHoveredDot(null)}
                    onMouseEnter={() => setHoveredDot(i)}
                    onMouseLeave={() => setHoveredDot(null)}
                    className={`flex-shrink-0 rounded-full transition-all duration-300 ease-out h-3 bg-primary
                        ${hoveredDot === i
                            ? "w-8"
                            : hoveredDot !== null
                                ? "w-3 bg-primary/50"
                                : step === i
                                    ? "w-8"
                                    : "w-3 bg-primary/50"
                        }`
                    }
                />
            ))}
        </div>
    )
}