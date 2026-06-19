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
    variant?: "standard" | "floating"
}

export default function PasswordField({
    value,
    onChange,
    disabled,
    label = "Password",
    name = "password",
    error,
    className = "",
    variant = "standard"
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    const isFilled = value.length > 0
    
    return (
        <div className={`relative ${className}`}>
            {variant === "standard" && label && (
                <label htmlFor="password" className="input-label">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={variant === "standard" ? "••••••••" : " "}
                    className={`input-field pr-10 w-full ${variant === "floating" ? "peer pt-5 pb-2" : ""}`}
                />

                {variant === "floating" && (
                    <label 
                        htmlFor={name}
                        className={`absolute left-3 transition-all duration-200 pointer-events-none
                        ${isFilled ? "top-1 text-xs text-primary" : "top-3 text-base text-foreground/50"}
                        peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary/50`}
                    >
                        {label}
                    </label>
                )}

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