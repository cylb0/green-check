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
            diagnostic.plant_label?.toLowerCase().includes(term)
            || diagnostic.disease_label?.toLowerCase().includes(term)
        )
    }, [data, searchTerm])


    useEffect(() => {
        if (error) toast.error(DIAGNOSTIC_FETCH_FAIL)
    }, [error, DIAGNOSTIC_FETCH_FAIL ])

    if (isLoading) return <div>Loading ...</div>
    if (!data) return null

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mt-6 mb-2">
                <h1 className="text-heading text-ink-900">{title}</h1>
            </div>
                
            <div className="sticky top-0 py-3 z-10 backdrop-blur-md">
                <SearchBar value={searchTerm} onSearch={setSearchTerm} placeholder={placeholder} />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col">
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
