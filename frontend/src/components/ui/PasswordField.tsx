import { useState, type ChangeEvent } from "react"
import { FaEye } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

interface PasswordFieldProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    label?: string
    name?: string
    error?: string
    className?: string
}

export default function PasswordField({
    value,
    onChange,
    disabled,
    label = "Password",
    name = "password",
    error,
    className = ""
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <div className={`relative ${className}`}>
            <label htmlFor="password" className="input-label">
                {label}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder="••••••••"
                    className="input-field pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    tabIndex={-1}
                    >
                    {showPassword ? <FaEye size={16} /> : <FaRegEye size={16} />}
                </button>
            </div>
            {error && (
                <p className="input-error">{error}</p>
            )}
        </div>
    )
}