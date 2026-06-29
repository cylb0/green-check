import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { ChangeLanguage, CollapsibleMenuItem, MenuIcon } from "@/components";
import { useAuth } from "@/context";
import { useTranslation } from "@/hooks";
import { PROFILE_PAGE_LABELS, PROFILE_PAGE_MENU, type ProfilePageMenu } from "@/data";

const getMenuItemClasses = (index: number, total: number) => {
    const isFirst = index === 0
    const isLast = index === total - 1

    const base = "relative border-x-2 border-foreground/20 p-2"
    const top = isFirst ? "border-t-2 rounded-t-lg" : ""
    const bottom = isLast ? "border-b-2 rounded-b-lg" : ""
    const separator = !isLast
        ? "after:absolute after:bottom-0 after:left-[10%] after:w-4/5 after:h-px after:bg-foreground/20"
        : ""

    return `${base} ${top} ${bottom} ${separator}`
}

export const CHEVRON_CLASSES = "hover:scale-110 active:scale-110"

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
            <div>
                {menuItems.map((item, index) => {
                    const itemClasses = getMenuItemClasses(index, menuItems.length)
                    const label = labels[item.labelKey]

                    switch (item.type) {
                        case "collapsible":
                            return (
                                <CollapsibleMenuItem key={`mi-${index}`} item={item} label={label} className={`${itemClasses} py-3`}>
                                    {item.renderChildren()}
                                </CollapsibleMenuItem>
                            )

                        case "language": {
                            return (
                                <ChangeLanguage key={`mi-${index}`} item={item} label={label} className={`${itemClasses} flex w-full items-center gap-4 py-3`}/>
                            )
                        }

                        case "link":
                            return (
                                <Link key={`mi-${index}`} className={`${itemClasses} flex w-full items-center gap-4 py-3`} to={item.href} >
                                    <MenuIcon icon={item.icon} />
                                    <span className="flex-1 text-left">{label}</span> 
                                    {item.chevron && <FaChevronRight className={`${CHEVRON_CLASSES}`} />}
                                </Link>
                            )

                        default: return null
                    }
                })}
            </div>
            <div>
                {actionItems.map((item, index) => (
                    <button
                        key={`ai-${index}`}
                        type="button"
                        onClick={() => handleAction(item)}
                        className={`${getMenuItemClasses(index, actionItems.length)} flex w-full items-center gap-4 text-error py-3`}
                    >
                        <MenuIcon icon={item.icon} className="text-error" />
                        {labels[item.labelKey]}
                    </button>
                ))}
            </div>
        </div>
    )
}
