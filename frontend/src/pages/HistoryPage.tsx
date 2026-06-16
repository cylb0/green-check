import { useState } from "react"
import DiagnosticCard from "../components/history-page/DiagnosticCard"
import SearchBar from "../components/ui/SearchBar"
import { SEARCH_BAR_PLACEHOLDER } from "../data/historyPage"
import { useDiagnostics } from "../hooks/useDiagnostics"

export default function HistoryPage() {
    const { data, isLoading, error } =  useDiagnostics()
    const [searchTerm, setSearchTerm] = useState("")

    if (isLoading) return <div>Loading ...</div>
    if (error) return <div>{error}</div>
    if (!data) return null

    const filteredData = data.filter(diagnostic =>
        diagnostic.detected_plant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        diagnostic.detected_disease?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="h-screen flex flex-col">
            <div className="sticky top-0 p-4 z-10 bg-white">
                <SearchBar value={searchTerm} placeholder={SEARCH_BAR_PLACEHOLDER} onSearch={setSearchTerm} />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-6">
                    {filteredData.map(diagnostic => (
                        <DiagnosticCard key={diagnostic.id} {...diagnostic} />
                    ))}
                </div>
            </div>
        </div>
    )
}
