import { AnimatePresence, motion } from "framer-motion";
import { useStepMessage } from "../../hooks/useStepMessage";

interface StatusTickerProps {
    messages: string[]
}

export default function StatusTicker({ messages }: StatusTickerProps) {
    const message = useStepMessage(messages)

    return (
        <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={message}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-600 font-medium"
                >
                    {message}
                </motion.p>
            </AnimatePresence>
        </div>
    )
}