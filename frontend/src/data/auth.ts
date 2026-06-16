interface LoginContent {
    signIn: string
    email: string
    password: string
    confirmPassword: string
    noAccount: string
    signUp: string
    forgotPassword: string
    accountAlready: string
}

export const LOGIN_CONTENT = {
    signIn: "Sign in",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    noAccount: "Don't have an account yet?",
    signUp: "Sign up",
    forgotPassword: "Forgot password?",
    accountAlready: "Already have an account ?"
} as const satisfies LoginContent
