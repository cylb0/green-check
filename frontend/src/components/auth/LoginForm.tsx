import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

interface FormState {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
    global?: string
}

function validate(values: FormState): FormErrors {
    const errors: FormErrors = {}
    if (!values.email) errors.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid mail'
    if (!values.password) errors.password = 'Password required'
    return errors
}

const inputStyle = "w-full border-2 rounded-lg border-primary/30 p-2 mt-1"
const labelStyle = "text-primary/80 font-bold"
const errorStyle = "absolute text-xs text-red-500"

export default function LoginForm() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [values, setValues] = useState<FormState>({ email: '', password: '' })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
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
            await login(values.email, values.password)
            navigate('/')
        } catch (err: any) {
            if (err.status === 401) {
                setErrors({ global: 'Email ou mot de passe incorrect' })
            } else {
                setErrors({ global: 'Une erreur est survenue, réessayez plus tard' })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative">
            {errors.global && (
                <div className={`${errorStyle} absolute`}>
                    {errors.global}
                </div>
            )}

            <div className="my-4 relative">
                <label htmlFor="email" className={labelStyle}>
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
                    className={inputStyle}
                />
                {errors.email && (
                    <p className={errorStyle}>{errors.email}</p>
                )}
            </div>

            <div className="mt-4 relative">
                <label htmlFor="password" className={labelStyle}>
                    Mot de passe
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
                        className={`${inputStyle} pr-10`}
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
                    <p className={errorStyle}>{errors.password}</p>
                )}
            </div>


            <div className="text-right mt-4">
                <a href="/forgot-password" className="text-sm font-bold text-primary/50 underline">
                    Mot de passe oublié ?
                </a>
            </div>

            <button
                type="submit"
                className="w-full bg-primary/80 text-white rounded-lg p-2 mt-4"
                disabled={isLoading}
            >
                {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    )
}