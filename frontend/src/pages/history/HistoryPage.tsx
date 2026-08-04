import toast from "react-hot-toast"
import { useEffect, useMemo, useState } from "react"
import { useDiagnostics, useTranslation } from "@/hooks"
import { ERRORS, HISTORY_TITLE, SEARCH_BAR_PLACEHOLDER } from "@/data"
import { DiagnosticCard, SearchBar } from "@/components"

export default function HistoryPage() {
    const { data, isLoading, error } =  useDiagnostics()
    const [searchTerm, setSearchTerm] = useState("")
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)
    const title = useTranslation(HISTORY_TITLE)
    const placeholder = useTranslation(SEARCH_BAR_PLACEHOLDER)

    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase()

        return data && data.filter(diagnostic =>
            (diagnostic.plant_label ?? "").toLowerCase().includes(term)
            || (diagnostic.disease_label ?? "").toLowerCase().includes(term)
        )
    }, [data, searchTerm])


    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])

    if (isLoading) return <div>Loading ...</div>
    if (!data) return null

    return (
        <div className="flex flex-col gap-6 pt-2">
            <div className="flex items-center justify-between">
                <h1 className="title-lg text-ink-inverse">{title}</h1>
            </div>

            <div className="sticky top-0 z-10">
                <SearchBar value={searchTerm} onSearch={setSearchTerm} placeholder={placeholder} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {filteredData && filteredData.map((diagnostic) => (
                        <DiagnosticCard
                            key={diagnostic.id}
                            {...diagnostic}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
