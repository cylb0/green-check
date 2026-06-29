import { Identity, ProfileMenu } from "@/components";
import { useTranslation } from "@/hooks";
import { PROFILE_PAGE_TITLE } from "@/data";

export default function ProfilePage() {
    const title = useTranslation(PROFILE_PAGE_TITLE)

    return (
        <div className="flex flex-col w-full"> 
            <h1 className="text-heading text-center">{title}</h1>
            <Identity />
            <ProfileMenu />
        </div>
    )
}
