import * as Popover from "@radix-ui/react-popover"
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from "../../constants/languages";
import type { ProfilePageMenu } from "../../data/profilePage";
import MenuIcon from "../ui/MenuRow";

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
                <div
                    className={`flex w-full items-center gap-4 ${className}`}
                >
                    <MenuIcon icon={item.icon} />
                    <span className="flex-1 text-left">{label}</span> 
                    <button
                        className="ml-auto flex items-center gap-2 text-sm text-foreground/50"
                    >
                        {LANGUAGE_LABELS[language]}
                    </button>
                </div>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side="bottom"
                    align="end"
                    className="bg-white border-2 border-primary/10 rounded-lg shadow-md"
                >
                    {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        >
                            {LANGUAGE_LABELS[lang]}
                        </button>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
