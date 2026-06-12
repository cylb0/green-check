import { Outlet } from "react-router-dom";
import BottomNav from "../components/nav/BottomNav";

export default function MainLayout() {
    return (
        <div className="relative w-full h-screen overflow-hidder">
            <main className="flex-1 h-full overflow-y-auto pt-4 px-4 pb-20">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    )
}