import { ReactNode, createContext, useEffect, useState } from "react";
import { faFingerprint, faKaaba, faUserGroup, faRunning } from '@fortawesome/free-solid-svg-icons';

import { GroupType, HabitType } from "../types/habitsContextType";
import { textToIcon } from "../components/icon-window/icon-data.component";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";

type AddNewHabitType = {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    newHabit: HabitType;
}


export const HabitsContext = createContext({
  habitGroups: [] as GroupType[],
  setHabitGroups: (habitGroups: Array<GroupType>) => {},
  allHabits: [] as HabitType[],
  setAllHabits: (() => {}) as React.Dispatch<React.SetStateAction<HabitType[]>>,
  addNewHabit: ({ allHabits, setAllHabits, newHabit }: AddNewHabitType) => {},
});

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
    const [habitGroups, setHabitGroups] = useState<GroupType[]>([
      { id: 1, icon: faKaaba, name: "All" },
      { id: 2, icon: faFingerprint, name: "Private" },
      { id: 3, icon: faUserGroup, name: "Shared" },
    ]);

    const [allHabits, setAllHabits] = useState<HabitType[]>([]);
    useEffect(() => {
        const fetchData = () => {
            const allHabitsData = [
                {
                    _id: "",
                    name: "",
                    icon: textToIcon("faRunning") as IconProp,
                    frequency: [{ type: "Daily", days: ["Everyday"], timesPerInterval: 1 }],
                    isNotificationOn: false,
                    notificationTime: "",
                    group: [],
                },
            ];

            setTimeout(() => {
                setAllHabits(allHabitsData);
            }, 1000);
        }
        fetchData();
    }, []);

    function addNewHabit({
        allHabits,
        setAllHabits,
        newHabit
    }: {
        allHabits: HabitType[];
        setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
        newHabit: HabitType;
        }) {
        try {
            setAllHabits([...allHabits, newHabit]);
            toast.success("New habit added!");
        } catch (error) {
            toast.error("Something went wrong!");
        }
        console.log(allHabits);
    }

  	const value = {
      habitGroups,
      setHabitGroups,
      allHabits,
      setAllHabits,
      addNewHabit,
    };
  return (
    <HabitsContext.Provider value={value}> {children} </HabitsContext.Provider>
  );
};
