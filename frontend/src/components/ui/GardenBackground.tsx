/**
 * Décor potager — DESIGN.md §2.5.
 *
 * Sujet aligné sur le modèle : PlantVillage, dont la tomate représente 10 des
 * 38 classes. D'où un potager tuteuré, pas un feuillage d'ornement — feuilles
 * composées à folioles, pied de tomate sur tuteur, fruits.
 *
 * Registre graphique de la référence 003 : formes pleines, contours francs,
 * aucun dégradé. Trois plans de profondeur, du plus sombre (loin) au plus
 * clair (près), massif dense à gauche et centre clairsemé.
 *
 * Les plans sont des <g> indépendants : ils peuvent être animés séparément
 * (parallaxe) sans redécoupage. Sur les écrans de travail ils restent
 * fixes — §7.3.
 *
 * `sprout` (#b0e85c) est volontairement absent : à cette surface il vire à
 * l'acide (anti-référence §2.4) et concurrencerait l'accent d'UI.
 */

/** Foliole ovale, base à l'origine, pointe vers le haut. */
const LEAFLET = "M0 0C-9-7-10-22 0-29C10-22 9-7 0 0Z"

/** Paires de folioles le long du rachis : [décalage, angle, échelle]. */
const PAIRS: [number, number, number][] = [
    [18, 56, 1],
    [40, 48, 0.9],
    [60, 40, 0.78],
]

/** Feuille composée : rachis, trois paires de folioles, une foliole terminale. */
function Compound({ transform }: { transform: string }) {
    return (
        <g transform={transform}>
            <path
                d="M0 0L0 -84"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
            />
            {PAIRS.map(([y, a, k]) => (
                <g key={y}>
                    <path d={LEAFLET} transform={`translate(0 ${-y}) rotate(${-a}) scale(${k})`} />
                    <path d={LEAFLET} transform={`translate(0 ${-y}) rotate(${a}) scale(${k})`} />
                </g>
            ))}
            <path d={LEAFLET} transform="translate(0 -80) scale(.82)" />
        </g>
    )
}

function Layer({ leaves, color }: { leaves: string[]; color: string }) {
    return (
        <g style={{ color }} fill={color}>
            {leaves.map((t, i) => (
                <Compound key={i} transform={t} />
            ))}
        </g>
    )
}

const FAR = [
    "translate(18 216) rotate(-20) scale(1.7)",
    "translate(72 210) rotate(4) scale(1.95)",
    "translate(150 216) rotate(-6) scale(1.15)",
]

const MID = [
    "translate(-2 220) rotate(-30) scale(2.1)",
    "translate(48 217) rotate(-6) scale(2.35)",
    "translate(104 221) rotate(18) scale(1.75)",
    "translate(182 222) rotate(8) scale(1.05)",
]

const NEAR = [
    "translate(26 230) rotate(-20) scale(2.6)",
    "translate(86 232) rotate(10) scale(2.25)",
    "translate(212 233) rotate(-5) scale(1.3)",
    "translate(262 231) rotate(12) scale(1.1)",
]

const LIT = [
    "translate(58 229) rotate(-13) scale(1.75)",
    "translate(238 233) rotate(6) scale(.95)",
]

/** Pied de tomate tuteuré — le sujet du produit, seul élément à fruits. */
function TomatoPlant() {
    return (
        <g>
            <path
                d="M338 238L332 76"
                stroke="var(--color-wood)"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M340 238C348 178 342 128 334 92"
                stroke="var(--color-garden-leaf-base)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
            />
            <Layer
                color="var(--color-garden-leaf-base)"
                leaves={[
                    "translate(343 196) rotate(-42) scale(1.3)",
                    "translate(337 150) rotate(34) scale(1.15)",
                    "translate(333 108) rotate(-26) scale(.95)",
                ]}
            />
            <g fill="var(--color-tomato)">
                <circle cx="316" cy="150" r="12" />
                <circle cx="352" cy="166" r="10.5" />
                <circle cx="322" cy="178" r="9.5" />
            </g>
            <g fill="var(--color-tomato-highlight)" opacity=".55">
                <ellipse cx="312" cy="145" rx="3.6" ry="2.4" />
                <ellipse cx="348" cy="161" rx="3.1" ry="2.1" />
                <ellipse cx="318" cy="174" rx="2.8" ry="1.9" />
            </g>
        </g>
    )
}

export default function GardenBackground() {
    return (
        <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-1/3"
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 400 240"
                preserveAspectRatio="xMidYMax meet"
                className="h-full w-full"
            >
                <Layer leaves={FAR} color="var(--color-garden-leaf-deep)" />
                <Layer leaves={MID} color="var(--color-garden-leaf-mid)" />
                <Layer leaves={NEAR} color="var(--color-garden-leaf-base)" />
                <Layer leaves={LIT} color="var(--color-garden-leaf-light)" />
                <TomatoPlant />
            </svg>
        </div>
    )
}
