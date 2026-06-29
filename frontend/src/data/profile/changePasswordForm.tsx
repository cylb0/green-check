import type { Translations } from "@/constants"

interface ChangePasswordFormTranslation {
    title: string
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
    button: string
}

export const CHANGE_PASSWORD_FORM: Translations<ChangePasswordFormTranslation> = {
    fr: {
        title: "Changer de mot de passe",
        oldPassword: "Ancien mot de passe",
        newPassword: "Nouveau mot de passe",
        newPasswordConfirm: "Confirmer le nouveau mot de passe",
        button: "Changer le mot de passe",
    },
    en: {
        title: "Change password",
        oldPassword: "Old password",
        newPassword: "New password",
        newPasswordConfirm: "Confirm password",
        button: "Change password",
    }
}