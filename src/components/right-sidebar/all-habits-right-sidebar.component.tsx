import UserProfileSidebar from "./user-profile-sidebar.component";
import DayProgressCard from "./day-progress-card.component";

const AllHabitsRightSidebar = () => {
    return (
        <div className="w-[30%] flex flex-col items-center-center rounded-xl pt- bg-white">
            <UserProfileSidebar />
            <DayProgressCard />
        </div>
    )
}

export default AllHabitsRightSidebar;