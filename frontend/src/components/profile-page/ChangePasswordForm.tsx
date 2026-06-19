import { useState } from "react"
import { authApi } from "../../api/auth"
import PasswordField from "../ui/PasswordField"
import { useTranslation } from "../../hooks/useTranslation"
import { CHANGE_PASSWORD_FORM } from "../../data/changePasswordForm"
import { ERRORS, MESSAGES, type ErrorsTranslation } from "../../data/messages"

interface FormState {
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
}

interface FormErrors {
    oldPassword?: string
    newPassword?: string
    newPasswordConfirm?: string
    global?: string
}

function validate(values: FormState, t: ErrorsTranslation): FormErrors {
    const errors: FormErrors = {}
    if (!values.oldPassword) errors.oldPassword = t.OLD_PASSWORD_REQUIRED
    if (!values.newPassword) errors.newPassword = t.PASSWORD_REQUIRED
    if (values.newPassword !== values.newPasswordConfirm) errors.newPasswordConfirm = t.PASSWORD_MISMATCH
    return errors
}

const FORM_INIT_STATE: FormState = { oldPassword: "", newPassword: "", newPasswordConfirm: "" }

export default function ChangePasswordForm() {
    const [values, setValues] = useState<FormState>(FORM_INIT_STATE)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const trad = useTranslation(CHANGE_PASSWORD_FORM)
    const errTrad = useTranslation(ERRORS)
    const { PASSWORD_CHANGED } = useTranslation(MESSAGES)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => ({...prev, [name]: value}))

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
            await authApi.changePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                newPasswordConfirm: values.newPasswordConfirm
            })

            setValues(FORM_INIT_STATE)
            alert(PASSWORD_CHANGED)
        } catch (err: any) {
            setErrors({ global: errTrad.GENERIC })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full">
            <p className="text-base font-semibold">{trad.title}</p>
            <form onSubmit={handleSubmit} noValidate className="relative w-full flex flex-col gap-2">
                {errors.global && (
                    <div className="input-error absolute">
                        {errors.global}
                    </div>
                )}

                <PasswordField
                    name={"oldPassword"}
                    value={values.oldPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    label={trad.oldPassword}
                    error={errors.oldPassword}
                    className="mt-2"
                    variant={"floating"}
                />

                <PasswordField
                    name={"newPassword"}
                    value={values.newPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    label={trad.newPassword}
                    error={errors.newPassword}
                    className="mt-2"
                    variant={"floating"}
                />

                <PasswordField
                    name={"newPasswordConfirm"}
                    value={values.newPasswordConfirm}
                    onChange={handleChange}
                    disabled={isLoading}
                    label={trad.newPasswordConfirm}
                    error={errors.newPasswordConfirm}
                    className="mt-2"
                    variant={"floating"}
                />

                <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white mt-4"
                >
                    {trad.button}
                </button>
            </form>
        </div>
    )
}