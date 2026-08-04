import { HOME_PAGE } from "@/constants"
import { DIAGNOSTIC_ERROR_PAGE_CONTENT } from "@/data"
import { useTranslation } from "@/hooks"
import { useNavigate } from "react-router-dom"
import { ActionButton } from "@/components"

export default function DiagnosticErrorPage() {
    const { message } = useTranslation(DIAGNOSTIC_ERROR_PAGE_CONTENT)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-full px-4 text-center gap-4">
            <p className="title-sm text-ink-inverse">
                {message}
            </p>
            <ActionButton
                className="mt-6"
                label="Retour à l'accueil"
                onClick={() => navigate(HOME_PAGE)}
                borderColor="border-transparent"
                textColor="text-on-primary"
                bgColor="bg-gradient-to-br from-primary-light to-primary"
                hoverColor="hover:brightness-105 active:brightness-95"
            />
        </div>
    )
}
