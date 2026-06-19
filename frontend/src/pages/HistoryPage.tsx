import { useEffect, useMemo, useState } from "react"
import DiagnosticCard from "../components/history-page/DiagnosticCard"
import SearchBar from "../components/ui/SearchBar"
import { SEARCH_BAR_PLACEHOLDER } from "../data/historyPage"
import { useDiagnostics } from "../hooks/useDiagnostics"
import { useTranslation } from "../hooks/useTranslation"
import { ERRORS } from "../data/messages"
import toast from "react-hot-toast"

export default function HistoryPage() {
    const { data, isLoading, error } =  useDiagnostics()
    const [searchTerm, setSearchTerm] = useState("")
    const { DIAGNOSTIC_FETCH_FAIL } = useTranslation(ERRORS)

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
        <div className="h-screen flex flex-col">
            <div className="sticky top-0 p-4 z-10 bg-white">
                <SearchBar value={searchTerm} placeholder={SEARCH_BAR_PLACEHOLDER} onSearch={setSearchTerm} />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-6">
                    {filteredData && filteredData.map(diagnostic => (
                        <DiagnosticCard key={diagnostic.id} {...diagnostic} />
                    ))}
                </div>
            </div>
        </div>
    )
}
