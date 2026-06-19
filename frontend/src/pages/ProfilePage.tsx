import Identity from "../components/profile-page/Identity";
import ProfileMenu from "../components/profile-page/ProfileMenu";
import { PROFILE_PAGE_TITLE } from "../data/profilePage";
import { useTranslation } from "../hooks/useTranslation";

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
