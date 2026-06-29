import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
    value: string
    placeholder: string
    onSearch: (value: string) => void
}

export default function SearchBar({ value, placeholder, onSearch }: SearchBarProps) {
    return (
        <div className="relative flex items-center w-full">
            <FaMagnifyingGlass size={18} className="absolute text-foreground/50 left-4" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 input-field rounded-xl border-card"
            />
        </div>
    )
}
