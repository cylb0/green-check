import { Outlet } from "react-router-dom";
import { PageHeader } from "@/components";
import { useState } from "react";

export default function DiagnosticLayout() {
    const [title, setTitle] = useState("")
    const [to, setTo] = useState<string | undefined>(undefined)

    return (
        <div className="h-full flex flex-col">
            <PageHeader title={title} to={to} />
            <div className="flex-1 overflow-y-auto">
                <Outlet context={{ setTitle, setTo }} />
            </div>
        </div>
    )
}