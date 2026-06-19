import * as Collapsible from "@radix-ui/react-collapsible"
import type { ProfilePageMenu } from "../../data/profilePage"
import type { ReactNode } from "react"
import { FaChevronRight } from "react-icons/fa6";
import { CHEVRON_CLASSES } from "./ProfileMenu";
import MenuIcon from "../ui/MenuRow";

interface CollapsibleMenuItemProps {
    item: ProfilePageMenu
    className: string
    label: string
    children: ReactNode
}

export default function CollapsibleMenuItem({ item, className = "", label, children }: CollapsibleMenuItemProps) {
    return (
        <Collapsible.Root className={className}>
            <Collapsible.Trigger className="group flex w-full items-center gap-4 data-[state=open]:mb-2">
                <MenuIcon icon={item.icon} />
                <span className="flex-1 text-left">{label}</span> 
                {item.chevron && (
                    <FaChevronRight className={`transition-transform group-data-[state=open]:rotate-90 shrink-0 ${CHEVRON_CLASSES}`} />
                )}
            </Collapsible.Trigger>
            <Collapsible.Content>
                {children}
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
