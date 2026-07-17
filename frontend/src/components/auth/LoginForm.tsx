import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context'
import { ERRORS, LOGIN_CONTENT, type ErrorsTranslation } from '@/data';
import { useTranslation } from '@/hooks';
import toast from 'react-hot-toast';
import { ActionButton, PasswordField } from '@/components';

interface FormState {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

function validate(values: FormState, t: ErrorsTranslation): FormErrors {
    const errors: FormErrors = {}
    if (!values.email) errors.email = t.EMAIL_REQUIRED
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t.INVALID_EMAIL
    if (!values.password) errors.password = t.PASSWORD_REQUIRED
    return errors
}

export default function LoginForm() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const { email, password, forgotPassword, signIn, loading } = useTranslation(LOGIN_CONTENT)
    const errTrad = useTranslation(ERRORS)
    const [values, setValues] = useState<FormState>({ email: '', password: '' })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
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
            await login(values.email, values.password)
            navigate('/')
        } catch (err: any) {
            if (err.status === 401) {
                toast.error(errTrad.INCORRECT_EMAIL_OR_PASSWORD)
            } else {
                toast.error(errTrad.GENERIC)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-full">
            <div className="my-4 relative field-card group">
                <label htmlFor="email" className="input-label">
                    {email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    value={values.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="exemple@email.com"
                    className="input-field"
                />
                {errors.email && (
                    <p className="absolute input-error bottom-1">{errors.email}</p>
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

            <div className="text-right mt-4">
                <a href="/forgot-password" className="text-sm font-bold text-primary-light">
                    {forgotPassword}
                </a>
            </div>

            <ActionButton
                type="submit"
                label={isLoading ? loading : signIn}
                disabled={isLoading}
                borderColor="border-transparent"
                textColor="text-ink-inverse"
                bgColor="bg-gradient-to-br from-primary-light to-primary shadow-lg shadow-primary-light/20"
                hoverColor="hover:brightness-105 active:brightness-95"
            />
        </form>
    )
}
