import type { ReactNode } from "react"
import type { Translations } from "../constants/languages"

interface LoginContent {
    signIn: string
    email: string
    password: string
    confirmPassword: string
    noAccount: string
    signUp: string
    forgotPassword: string
    accountAlready: string
    acceptTerms: ReactNode
}

export const LOGIN_CONTENT = {
    fr: {
        signIn: "Se connecter",
        email: "Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        noAccount: "Vous n'avez pas encore de compte ?",
        signUp: "S'inscrire",
        forgotPassword: "Mot de passe oublié ?",
        accountAlready: "Vous avez déjà un compte ?",
        acceptTerms: <>J'accepte les <a>Conditions d'Utilisation</a> et la <a>Politique de Confidentialité</a></>
    },
    enGB: {
        signIn: "Sign in",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        noAccount: "Don't have an account yet?",
        signUp: "Sign up",
        forgotPassword: "Forgot password?",
        accountAlready: "Already have an account ?",
        acceptTerms: <>I accept the <a>Terms of Use</a> and the <a>Privacy Policy</a></>
    }

} satisfies Translations<LoginContent>