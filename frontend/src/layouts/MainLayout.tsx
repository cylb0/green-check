import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components";

export default function MainLayout() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className="fixed inset-0 bg-cream/50 pointer-events-none z-0"
                aria-hidden="true"
            />

            <main className="relative z-10 h-full overflow-y-auto pt-4 px-4 pb-20">
                <Outlet />
            </main>

            <BottomNav />
        </div>
    )
}
