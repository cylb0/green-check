import type { Translations } from "../constants/languages";

export interface ErrorsTranslation {
    PASSWORD_REQUIRED: string
    OLD_PASSWORD_REQUIRED: string
    PASSWORD_MISMATCH: string
    GENERIC: string
}

export const ERRORS: Translations<ErrorsTranslation> = {
    fr: {
        PASSWORD_REQUIRED: "Le mot de passe est requis",
        OLD_PASSWORD_REQUIRED: "L'ancien mot de passe est requis",
        PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
        GENERIC: "Une erreur est survenue. Veuillez réessayer plus tard."
    },
    en: {
        PASSWORD_REQUIRED: "Password required",
        OLD_PASSWORD_REQUIRED: "Old password required",
        PASSWORD_MISMATCH: "Passwords do not match",
        GENERIC: 'An error occurred. Please try again later'
    }
}

interface MessagesTranslation {
    PASSWORD_CHANGED: string
}

export const MESSAGES: Translations<MessagesTranslation> = {
    fr: {
        PASSWORD_CHANGED: 'Le mot de passe a été modifié avec succès'
    },
    en: {
        PASSWORD_CHANGED: 'Password changed successfully'
    }
}
