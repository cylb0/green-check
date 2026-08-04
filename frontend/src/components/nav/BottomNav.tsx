import { NavLink } from "react-router-dom"
import { BOTTOM_NAV_LABELS, NAV_ITEMS, type NavItem } from "@/data"
import { useTranslation } from "@/hooks"

type NavItemProps = NavItem & { label: string }

function NavItem({ id, label, icon: Icon, activeIcon: ActiveIcon }: NavItemProps) {
    return (
        <NavLink
            to={id}
            end
            className={({ isActive }) => `flex flex-col items-center gap-0.5 transition
                hover:-translate-y-0.5 active:translate-y-0 active:scale-90
                ${isActive ? "text-primary-light" : "text-parchment-400/70 hover:text-primary-light active:text-primary-light"}`}
        >
            {({ isActive }) => {
                const DisplayIcon = isActive && ActiveIcon ? ActiveIcon : Icon
                return (
                    <>
                        <DisplayIcon size={22} />
                        <span className="label">{label}</span>
                    </>
                )
            }}
        </NavLink>
    )
}

export default function BottomNav() {
    const labels = useTranslation(BOTTOM_NAV_LABELS)

    // La nav déborde sous l'indicateur d'accueil : sa hauteur utile reste
    // --nav-height, la safe area s'ajoute en dessous — §5.3
    return (
        <nav
            className="fixed bottom-0 w-full z-50 glass-chrome pt-4
                h-[calc(var(--nav-height)+env(safe-area-inset-bottom))]
                pb-[calc(1rem+env(safe-area-inset-bottom))]"
        >
            {/* La barre est pleine largeur (chrome), ses items s'alignent
                sur la colonne de contenu — §5.1, §5.4 */}
            <div className="grid grid-cols-4 h-full items-end px-4 mx-auto w-full max-w-[480px]">
                {NAV_ITEMS.map((item, i) => (
                    <NavItem key={i} {...item} label={labels[item.labelKey]} />
                ))}
            </div>
        </nav>
    )
}
