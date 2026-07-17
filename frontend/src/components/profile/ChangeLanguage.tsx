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
                    <span className="flex-1 text-left text-sm font-semibold text-ink-900">{label}</span> 
                    <button className="ml-auto flex items-center gap-2 text-sm font-medium text-ink-400">
                        {LANGUAGE_LABELS[language]}
                    </button>
                </div>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side="bottom"
                    align="end"
                    className="bg-paper/90 backdrop-blur-xl border border-paper/70 rounded-2xl shadow-lg p-1.5 z-50"
                >
                    {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-ink-900 rounded-xl transition-colors hover:bg-cream"
                        >
                            {LANGUAGE_LABELS[lang]}
                        </button>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
