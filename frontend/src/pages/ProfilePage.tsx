import Identity from "../components/profile-page/Identity";
import ProfileMenu from "../components/profile-page/ProfileMenu";
import { PROFILE_PAGE_TITLE } from "../data/profilePage";

export default function ProfilePage() {
    return (
        <div className="flex flex-col w-full"> 
            <h1 className="text-heading text-center">{PROFILE_PAGE_TITLE}</h1>
            <Identity />
            <ProfileMenu />
        </div>
    )
}
