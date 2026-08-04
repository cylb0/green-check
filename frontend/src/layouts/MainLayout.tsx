import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components";

export default function MainLayout() {
    return (
        <div className="relative w-full h-dvh overflow-hidden">
            {/* Voile de lisibilité au-dessus du décor — DESIGN.md §11 */}
            <div
                className="fixed inset-0 bg-gradient-to-b from-emerald-800/30 via-transparent to-emerald-900/70 pointer-events-none z-0"
                aria-hidden="true"
            />

            {/* Contenu plafonné à 480px et centré — §5.1. Au-delà, c'est
                l'environnement emerald et le décor qui occupent la largeur. */}
            {/* Dégagement = hauteur de nav + safe area + un pas de rythme.
                `pb-20` collait le dernier élément contre la nav — §5.3 */}
            <main
                className="relative z-10 h-full overflow-y-auto pt-4
                    pb-[calc(var(--nav-height)+env(safe-area-inset-bottom)+1.5rem)]"
            >
                <div className="mx-auto w-full max-w-[480px] px-4">
                    <Outlet />
                </div>
            </main>

            <BottomNav />
        </div>
    )
}
