import { NavLink } from "react-router-dom"
import { BOTTOM_NAV_LABELS, NAV_ITEMS, type NavItem } from "@/data"
import { useTranslation } from "@/hooks"

type NavItemProps = NavItem & { label: string }

function NavItem({ id, label, icon: Icon, activeIcon: ActiveIcon }: NavItemProps) {
    return (
        <NavLink
            to={id}
            end
            className={({ isActive }) => `flex flex-col items-center gap-0.5 transition-all
                hover:-translate-y-0.5 active:translate-y-0 active:scale-90
                ${isActive ? "text-primary" : "text-ink-400 hover:text-primary active:text-primary"}`}
        >
            {({ isActive }) => {
                const DisplayIcon = isActive && ActiveIcon ? ActiveIcon : Icon
                return (
                    <>
                        <DisplayIcon size={22} />
                        <span className="text-xs font-bold">{label}</span>
                    </>
                )
            }}
        </NavLink>
    )
}

export default function BottomNav() {
    const labels = useTranslation(BOTTOM_NAV_LABELS)

    return (
        <nav className="fixed bottom-0 w-full border-t-2 border-paper/60 h-20 py-4 z-50
            bg-paper/55 backdrop-blur-lg">
            <div className="grid grid-cols-4 h-full items-end px-4">
                {NAV_ITEMS.map((item, i) => (
                    <NavItem key={i} {...item} label={labels[item.labelKey]} />
                ))}
            </div>
        </nav>
    )
}
