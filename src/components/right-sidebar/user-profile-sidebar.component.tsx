import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const UserProfileSidebar = () => {
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-14 h-14",
            UserButtonPopoverActionButton: "text-red-600",
        },
    };

    const {user} = useUser();
    
    return (
        <div className="flex flex-col gap-3 items-center justify-center mt-9">
            <UserButton
                appearance={userButtonAppearance} />
            <div>
                <span>{user?.fullName}</span>
            </div>
        </div>
    );
};

export default UserProfileSidebar;