import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
    value: string
    onSearch: (value: string) => void
    placeholder: string
}

export default function SearchBar({ value, onSearch, placeholder }: SearchBarProps) {
    return (
        <div className="relative flex items-center w-full rounded-2xl gap-2
            bg-paper/55 backdrop-blur-md border border-paper/60
            px-3 py-2.5
            transition-colors duration-150
            focus-within:border-primary-light focus-within:bg-paper/70"
        >
            <FaMagnifyingGlass size={16} className="text-ink-400 flex-shrink-0" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-transparent border-none
                    text-sm text-ink-900 placeholder:text-ink-400 outline-none"
            />
        </div>
    )
}
