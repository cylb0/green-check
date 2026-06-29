import type { Translations } from "../../constants"

export interface ErrorsTranslation {
    EMAIL_REQUIRED: string
    INVALID_EMAIL: string
    PASSWORD_REQUIRED: string
    OLD_PASSWORD_REQUIRED: string
    PASSWORD_MISMATCH: string
    INCORRECT_EMAIL_OR_PASSWORD: string
    ACCEPT_TERMS: string
    GENERIC: string
    DIAGNOSTIC_FETCH_FAIL: string
    SUBMISSION_FAIL: string
}

export const ERRORS: Translations<ErrorsTranslation> = {
    fr: {
        EMAIL_REQUIRED: "L'email est requis",
        INVALID_EMAIL: "L'email est invalide",
        PASSWORD_REQUIRED: "Le mot de passe est requis",
        OLD_PASSWORD_REQUIRED: "L'ancien mot de passe est requis",
        PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
        INCORRECT_EMAIL_OR_PASSWORD: "Email ou mot de passe est incorrect",
        ACCEPT_TERMS: "Vous devez accepter les conditions d'utilisation",
        GENERIC: "Une erreur est survenue. Veuillez réessayer plus tard",
        DIAGNOSTIC_FETCH_FAIL: "Une erreur est survenue pendant la récupération du diagnostic",
        SUBMISSION_FAIL: "Echec de l'envoie de la demande, veuillez réessayer plus tard",
    },
    en: {
        EMAIL_REQUIRED: "Email required",
        INVALID_EMAIL: "Invalid email",
        PASSWORD_REQUIRED: "Password required",
        OLD_PASSWORD_REQUIRED: "Old password required",
        PASSWORD_MISMATCH: "Passwords do not match",
        INCORRECT_EMAIL_OR_PASSWORD: "Incorrect email or password",
        ACCEPT_TERMS: "You must agree to the terms",
        GENERIC: 'An error occurred. Please try again later',
        DIAGNOSTIC_FETCH_FAIL: "An error occurred while fetching the diagnostic data",
        SUBMISSION_FAIL: "An error occurred while submitting the request, please try again later",
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
