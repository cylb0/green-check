import { matchPath, Outlet, useLocation } from "react-router-dom";
import { PageHeader } from "@/components";
import { DIAGNOSTIC_ADVICE_PAGE, DIAGNOSTIC_ERROR_PAGE, DIAGNOSTIC_RESULT_PAGE, HISTORY_PAGE, type Translations } from "@/constants";
import { DIAGNOSTIC_ADVICE_PAGE_NAME, RESULTS_ERROR_PAGE_NAME, RESULTS_PAGE_NAME } from "@/data";
import { useLanguage } from "@/context";

export const DIAGNOSTIC_HEADERS: Record<string, { title: Translations<string>, to?: string }> = {
    [DIAGNOSTIC_RESULT_PAGE]: { title: RESULTS_PAGE_NAME, to: HISTORY_PAGE },
    [DIAGNOSTIC_ADVICE_PAGE]: { title: DIAGNOSTIC_ADVICE_PAGE_NAME },
    [DIAGNOSTIC_ERROR_PAGE]: { title: RESULTS_ERROR_PAGE_NAME, to: HISTORY_PAGE }
}

export default function DiagnosticLayout() {
    const { pathname } = useLocation()
    const { language } = useLanguage()
    const header = Object.entries(DIAGNOSTIC_HEADERS).find(([path]) => matchPath(path, pathname))?.[1]

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden pb-8">
            <div
                className="absolute inset-0 bg-gradient-to-b from-pine-800/40 via pine-900/40 to-pine-900/60 pointer-events-none z-0"
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col min-h-screen">
                <PageHeader title={header?.title[language]} to={header?.to} variant="dark" />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
