import type { IconType } from "react-icons";
import { FaCut, FaFlask, FaSeedling, FaSun, FaTint } from "react-icons/fa";

export const TREATMENT_ICONS: Record<string, IconType> = {
    pruning: FaCut,
    watering: FaTint,
    fungicide: FaFlask,
    soil: FaSeedling,
    sunlight: FaSun,
}

export type TreatmentIcon = keyof typeof TREATMENT_ICONS
