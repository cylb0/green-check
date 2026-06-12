import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

interface FormState {
    email: string
    password: string
    passwordConfirm: string
    acceptTerms: boolean
}

interface FormErrors {
    email?: string
    password?: string
    passwordConfirm?: string
    acceptTerms?: string
    global?: string
}

function validate(values: FormState): FormErrors {
    const errors: FormErrors = {}
    if (!values.email) errors.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid mail'
    if (!values.password) errors.password = 'Password required'
    if (values.password !== values.passwordConfirm) errors.passwordConfirm = 'Passwords do not match'
    if (!values.acceptTerms) errors.acceptTerms  = 'You must agree to the terms'
    return errors
}

export default function LoginForm() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [values, setValues] = useState<FormState>({ email: '', password: '', passwordConfirm: '', acceptTerms: false })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target

        const newValue = type === "checkbox" ? checked : value

        setValues(prev => ({ ...prev, [name]: newValue }))

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            await register(values.email, values.password)
            navigate('/')
        } catch (err: any) {
            setErrors({ global: 'An error occurred. Please try again later' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            {errors.global && (
                <div className="input-error absolute">
                    {errors.global}
                </div>
            )}

            <div className="my-4 relative">
                <label htmlFor="email" className="input-label">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="exemple@email.com"
                    className="input-field"
                />
                {errors.email && (
                    <p className="input-error">{errors.email}</p>
                )}
            </div>

            <div className="mt-4 relative">
                <label htmlFor="password" className="input-label">
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        disabled={isLoading}
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
                {errors.password && (
                    <p className="input-error">{errors.password}</p>
                )}
            </div>

            <div className="mt-4 relative">
                <label htmlFor="passwordConfirm" className="input-label">
                    Confirm password
                </label>
                <div className="relative">
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type={showPassword ? "text" : "password"}
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        disabled={isLoading}
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
                {errors.password && (
                    <p className="input-error">{errors.passwordConfirm}</p>
                )}
            </div>

            <div className="mt-4 flex gap-4 relative">
                <div className="relative">
                    <input
                        id="checkbox"
                        name="acceptTerms"
                        type="checkbox"
                        checked={values.acceptTerms}
                        onChange={handleChange}
                        className="accent-primary"
                    />
                </div>
                <label htmlFor="checkbox" className="input-label">
                    I accept the <a>Terms of Use</a> and the <a>Privacy Policy</a>
                </label>
                {errors.acceptTerms && (
                    <p className="input-error top-full left-0 mt-1">{errors.acceptTerms}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-primary/80 text-white rounded-lg p-2 mt-6"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Sign up'}
            </button>
        </form>
    )
}