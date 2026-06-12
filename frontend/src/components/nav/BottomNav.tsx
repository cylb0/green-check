import { NAV_ITEMS, type NavItem } from "../../constants/bottomNavbar"
import { IoCameraOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom"

function NavItem({ id, label, icon: Icon, activeIcon: ActiveIcon }: NavItem) {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = location.pathname === `/${id}`
    const DisplayIcon = isActive ? ActiveIcon : Icon

    return (
        <button
            onClick={() => navigate(`/${id}`)}
            className="flex flex-col items-center gap-0.5 active:scale-90 transition-transform duration-150"
        >
            <DisplayIcon size={22} className={`transition-colors duration-200 ${isActive ? "text-primary/50" : "text-primary/30"}`} />
            <span className={`text-xs font-bold transition-colors duration-200 ${isActive ? "text-primary/50" : "text-primary/30"}`}>
                {label}
            </span>
        </button>
    )
}

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 w-full border-t border-gray-200 h-20 py-4 z-50 bg-white">
            <div className="grid grid-cols-5 h-full items-end px-4">
                <div aria-hidden="true"/>
                <NavItem {...NAV_ITEMS[0]} />
                <div aria-hidden="true"/>
                <NavItem {...NAV_ITEMS[1]} />
                <NavItem {...NAV_ITEMS[2]} />

                <div className="absolute left-1/2 -translate-x-1/2">
                    <button
                        className="p-4 rounded-full shadow-lg transition-all duration-200 active:scale-90 active:bg-primary/80 bg-primary/50"
                    >
                        <IoCameraOutline
                            size={32}
                            className="text-white transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}