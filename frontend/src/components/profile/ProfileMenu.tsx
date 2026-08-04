import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { ChangeLanguage, CollapsibleMenuItem, MenuIcon } from "@/components";
import { useAuth } from "@/context";
import { useTranslation } from "@/hooks";
import { PROFILE_PAGE_LABELS, PROFILE_PAGE_MENU, type ProfilePageMenu } from "@/data";

export const CARD_CLASSES = `rounded-card glass
    transition duration-150
    hover:-translate-y-0.5 hover:shadow-ambient`
export const ROW_CLASSES = `${CARD_CLASSES} flex w-full items-center gap-4 py-3 px-4 
    active:translate-y-0 active:scale-[0.98]`
export const CHEVRON_CLASSES = "text-parchment-400/70"

export default function ProfileMenu() {
    const { logout } = useAuth()
    const labels = useTranslation(PROFILE_PAGE_LABELS)

    const handleAction = (item: ProfilePageMenu) => {
        if (item.type === "action" && item.actionKey === "logout") {
            logout()
        }
    }

    const menuItems = PROFILE_PAGE_MENU.filter(item => item.type !== "action")
    const actionItems = PROFILE_PAGE_MENU.filter(item => item.type === "action")

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                    const label = labels[item.labelKey]

                    switch (item.type) {
                        case "collapsible":
                            return (
                                <CollapsibleMenuItem
                                    key={`mi-${index}`}
                                    item={item}
                                    label={label}
                                    className={`${CARD_CLASSES} p-4`}
                                >
                                    {item.renderChildren()}
                                </CollapsibleMenuItem>
                            )

                        case "language": {
                            return (
                                <ChangeLanguage
                                    key={`mi-${index}`}
                                    item={item}
                                    label={label}
                                    className={ROW_CLASSES}
                                />
                            )
                        }

                        case "link":
                            return (
                                <Link
                                    key={`mi-${index}`}
                                    className={ROW_CLASSES}
                                    to={item.href}
                                >
                                    <MenuIcon icon={item.icon} />
                                    <span className="flex-1 text-left body-strong text-ink-inverse">{label}</span> 
                                    {item.chevron && <FaChevronRight className={CHEVRON_CLASSES} />}
                                </Link>
                            )

                        default: return null
                    }
                })}
            </div>
            <div className="flex flex-col gap-2">
                {actionItems.map((item, index) => (
                    <button
                        key={`ai-${index}`}
                        type="button"
                        onClick={() => handleAction(item)}
                        className={`${ROW_CLASSES} text-severity-high-dark-text hover:bg-severity-high-dark-bg/60`}
                    >
                        <MenuIcon icon={item.icon} className="text-severity-high-dark-text" />
                        <span className="body-strong">{labels[item.labelKey]}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
