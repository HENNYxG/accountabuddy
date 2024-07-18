import HabitCard from '../../components/habit-card/habit-card.component';
import AllHabitsPageUI from "./top-bar.component";
import React from 'react'

 const AllHabitsPage = () => {
   return (
     <div className="w-full flex flex-col">
       <div className="">
         <h1 className="text-5xl font-bold pb-5">All Habits</h1>
         <AllHabitsPageUI />
       </div>
       <div className="w-[80%] m-5 flex flex-row gap-2 bg-black">
         <HabitCard />
         <HabitCard />
       </div>
     </div>
   );
 };
export default AllHabitsPage;
