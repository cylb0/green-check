import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { LOGIN_CONTENT } from '../../data/auth';
import { useTranslation } from '../../hooks/useTranslation';
import PasswordField from '../ui/PasswordField';
import { ERRORS, type ErrorsTranslation } from '../../data/messages';
import toast from 'react-hot-toast';

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
}

function validate(values: FormState, t: ErrorsTranslation): FormErrors {
    const errors: FormErrors = {}
    if (!values.email) errors.email = t.EMAIL_REQUIRED
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t.INVALID_EMAIL
    if (!values.password) errors.password = t.PASSWORD_REQUIRED
    if (values.password !== values.passwordConfirm) errors.passwordConfirm = t.PASSWORD_MISMATCH
    if (!values.acceptTerms) errors.acceptTerms  = t.ACCEPT_TERMS
    return errors
}

export default function LoginForm() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [values, setValues] = useState<FormState>({ email: '', password: '', passwordConfirm: '', acceptTerms: false })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    const { email, password, confirmPassword, acceptTerms, loading, signUp } = useTranslation(LOGIN_CONTENT)
    const errTrad = useTranslation(ERRORS)

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
        const validationErrors = validate(values, errTrad)
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
            toast.error(errTrad.GENERIC)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            <div className="my-4 relative">
                <label htmlFor="email" className="input-label">
                    {email}
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

            <PasswordField
                name={"password"}
                value={values.password}
                onChange={handleChange}
                disabled={isLoading}
                label={password}
                error={errors.password}
                className="mt-4"
            />

            <PasswordField
                name={"passwordConfirm"}
                value={values.passwordConfirm}
                onChange={handleChange}
                disabled={isLoading}
                label={confirmPassword}
                error={errors.passwordConfirm}
                className="mt-4"
            />

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
                    {acceptTerms}
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
                {isLoading ? loading : signUp}
            </button>
        </form>
    )
}
