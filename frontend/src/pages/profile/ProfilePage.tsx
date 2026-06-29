import { Identity, ProfileMenu } from "../../components";
import { PROFILE_PAGE_TITLE } from "../../data";
import { useTranslation } from "../../hooks";

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
