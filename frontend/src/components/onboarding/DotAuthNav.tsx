import { useAuthNav } from "@/context";

/**
 * Pastilles de progression du flux d'authentification.
 *
 * L'état actif n'est jamais écrasé par le survol (§7.4). L'implémentation
 * précédente pilotait le survol en state React, avec `onTouchStart` : toucher
 * une pastille la faisait paraître active alors que l'étape n'avait pas
 * changé. Le survol passe désormais par CSS — Tailwind v4 le place déjà sous
 * `@media (hover:hover)`, donc il ne se déclenche pas au doigt.
 *
 * La marge extérieure appartient au parent (§5.3).
 */
export default function DotAuthNav() {
    const { goTo, step } = useAuthNav()

    return (
        <div className="flex gap-2">
            {[0, 1, 2].map((i) => {
                const isActive = step === i
                return (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Étape ${i + 1}`}
                        aria-current={isActive ? "step" : undefined}
                        className={`h-3 flex-shrink-0 rounded-full transition-[width,background-color] motion-base
                            ${isActive
                                ? "w-8 bg-primary-light"
                                : "w-3 bg-parchment-400/40 hover:bg-parchment-400/70"}`}
                    />
                )
            })}
        </div>
    )
}
