import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
    value: string
    onSearch: (value: string) => void
    placeholder: string
}

export default function SearchBar({ value, onSearch, placeholder }: SearchBarProps) {
    return (
        <div className="relative flex items-center w-full rounded-field gap-2
            glass
            px-4 py-3
            transition-colors duration-150
            focus-within:border-primary-light"
        >
            <FaMagnifyingGlass size={16} className="text-parchment-400/70 flex-shrink-0" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-transparent border-none
                    body text-ink-inverse placeholder:text-parchment-400/70 outline-none"
            />
        </div>
    )
}
