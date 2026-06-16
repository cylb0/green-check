import { Outlet } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { useState } from "react";

export default function DiagnosticLayout() {
    const [title, setTitle] = useState("")

    return (
        <div className="h-full flex flex-col">
            <PageHeader title={title} />
            <div className="flex-1 overflow-y-auto">
                <Outlet context={{ setTitle }} />
            </div>
        </div>
    )
}