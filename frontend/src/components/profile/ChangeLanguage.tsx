import * as Popover from "@radix-ui/react-popover"
import { MenuIcon } from "@/components";
import { useLanguage } from "@/context";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from "@/constants";
import type { ProfilePageMenu } from "@/data";

interface ChangeLanguageProps {
    item: ProfilePageMenu
    className: string
    label: string
}

export default function ChangeLanguage({ item, className = "", label }: ChangeLanguageProps) {
    const { language, setLanguage } = useLanguage()

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div className={className}>
                    <MenuIcon icon={item.icon} />
                    <span className="flex-1 text-left body-strong text-ink-inverse">{label}</span> 
                    <button className="ml-auto flex items-center gap-2 body text-parchment-400/70">
                        {LANGUAGE_LABELS[language]}
                    </button>
                </div>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side="bottom"
                    align="end"
                    className="glass-strong rounded-card shadow-ambient p-2 z-50"
                >
                    {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className="w-full text-left px-4 py-2 body text-ink-inverse rounded-control transition-colors hover:bg-parchment-200/10"
                        >
                            {LANGUAGE_LABELS[lang]}
                        </button>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
