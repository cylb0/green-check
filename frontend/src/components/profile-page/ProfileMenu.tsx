import { useAuth } from "../../context/authContext"
import { PROFILE_PAGE_LABELS, PROFILE_PAGE_MENU, type ProfilePageMenu } from "../../data/profilePage"
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ChangeLanguage from "./ChangeLanguage";
import CollapsibleMenuItem from "./CollapsibleMenuItem";
import MenuIcon from "../ui/MenuRow";
import { useTranslation } from "../../hooks/useTranslation";

const getMenuItemClasses = (index: number, total: number) => {
    const isFirst = index === 0
    const isLast = index === total - 1

    const baseClasses = "border-2 border-primary/10 bg-primary/5 p-2"
    const borderTop = isFirst ? "border-t-2 rounded-t-lg" : "-mt-0.5"
    const borderBottom = isLast ? "rounded-b-lg" : ""

    return `${baseClasses} ${borderTop} ${borderBottom}`
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
                                <CollapsibleMenuItem key={`mi-${index}`} item={item} label={label} className={itemClasses}>
                                    {item.renderChildren()}
                                </CollapsibleMenuItem>
                            )

                        case "language": {
                            return (
                                <ChangeLanguage key={`mi-${index}`} item={item} label={label} className={`${itemClasses} flex w-full items-center gap-4`}/>
                            )
                        }

                        case "link":
                            return (
                                <Link key={`mi-${index}`} className={`${itemClasses} flex w-full items-center gap-4`} to={item.href} >
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
                        className={`${getMenuItemClasses(index, actionItems.length)} flex w-full items-center gap-4`}
                    >
                        <MenuIcon icon={item.icon} />
                        {labels[item.labelKey]}
                    </button>
                ))}
            </div>
        </div>
    )
}
