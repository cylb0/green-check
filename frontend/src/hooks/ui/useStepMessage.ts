import { useEffect, useState } from "react";

export function useStepMessage(messages: string[], timer: number = 2500) {
    const [index, setIndex] = useState(0)
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length)
        }, timer)
        return () => clearInterval(interval)
    }, [])
    
    return messages[index]
}
