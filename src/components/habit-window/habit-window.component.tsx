import React from "react";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { UIContext } from "../../contexts/ui.context";
import CloseButton from "../ui-elements/close-button.component";
import IconsWindow from "../icon-window/icon-window.component";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@mui/material";
import IOSSwitch from "../ui-elements/switch.component";
import TimerPicker from "../ui-elements/time-picker.component";
import HabitWindowGroup from "./habit-window-group.component";
import { GroupType, HabitType, DayOption } from "../../types/habitsContextType";
import { HabitsContext } from "../../contexts/habits.context";
import toast from "react-hot-toast";


const HabitWindow = () => {
  const {
    habitWindowOpen,
    darkMode,
    darkModeColor,
    lightModeColor,
    timePickerWindowOpen,
  } = useContext(UIContext);

  const [habitItem, setHabitItem] = useState<HabitType>({
    _id: "",
    name: "",
    icon: faRunning,
    frequency: [{ type: "Daily", days: ["Everyday"], timesPerInterval: 1 }],
    isNotificationOn: false,
    notificationTime: "",
    group: [],
  });

  const onUpdateHabitName = (inputText: string) => {
    //create shadow copy of habit item
    const copyHabitItem = { ...habitItem };
    //modify the name prop based on input text
    copyHabitItem.name = inputText;
    //update the habit item state
    setHabitItem(copyHabitItem);
  };
  const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
  const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

  //update habit item icon when icon selected changes
  useEffect(() => {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.icon = iconSelected;
    setHabitItem(copyHabitItem);
  }, [iconSelected]);

  const changeRepeatOption = (repeatOptions: RepeatOption[]) => {
    const selectedOption = repeatOptions.filter((option) => option.selected);
    const selectedOptionName = selectedOption[0].name;
    const copyHabitItem = { ...habitItem };
    copyHabitItem.frequency[0].type = selectedOptionName;

    setHabitItem(copyHabitItem);
  };

  const changeDaysOption = (allDays: DayOption[]) => {
    const selectedDays = allDays.filter((day) => day.selected);
    const selectedDaysName = selectedDays.map((day) => day.name);

    const copyHabitItem = { ...habitItem };
    copyHabitItem.frequency[0].days = selectedDaysName;
    setHabitItem(copyHabitItem);
  };

  const changeWeeksOption = (weeks: number) => {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.frequency[0].timesPerInterval = weeks;
    setHabitItem(copyHabitItem);
  };

  function updateReminderTime (timeValue: string) {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.notificationTime = timeValue;
    setHabitItem(copyHabitItem);
    console.log("i ran")
  };

  const getSelectedGroupItems = (selectedGroupItems: GroupType[]) => {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.group = selectedGroupItems;
    setHabitItem(copyHabitItem);
  }

  return (
    <div
      style={{
        backgroundColor: darkMode
          ? darkModeColor.secondaryBackground
          : lightModeColor.secondaryBackground,
        color: darkMode ? darkModeColor.text : lightModeColor.text,
      }}
      className={` top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-[60] p-8 rounded-md shadow-md ${
        habitWindowOpen ? "absolute" : "hidden"
      }`}
    >
      <TimerPicker onSaveTime={updateReminderTime} />
      <IconsWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIconSelected={setIconSelected}
      />
      <HeaderMemo />
      <InputNameAndIconButton
        onUpdateHabitName={onUpdateHabitName}
        habitName={habitItem.name}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
      />
      <Repeat
        onChangeOption={changeRepeatOption}
        onChangeDaysOption={changeDaysOption}
        onWeekChangeOption={changeWeeksOption}
      />
      <Reminder habitItem={habitItem} setHabitItem={setHabitItem} />
      <HabitWindowGroup onChange={getSelectedGroupItems} />
      <SaveButton habit={habitItem} />
    </div>
  );
};

export default HabitWindow;

const Header = () => {
  const { setHabitWindowOpen } = useContext(UIContext);
  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-2xl">Add New Habit</span>
      <CloseButton onClick={() => setHabitWindowOpen(false)} className="flex" />
    </div>
  );
};

const InputNameAndIconButton = ({
  onUpdateHabitName,
  habitName,
  setOpenIconWindow,
  iconSelected,
}: {
  onUpdateHabitName: (inputText: string) => void;
  habitName: string;
  setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  iconSelected: IconProp;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { habitWindowOpen, darkMode, darkModeColor, lightModeColor } =
    useContext(UIContext);

  const updateInputHabit = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateHabitName(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    //empty habit name when window closes
    if (!habitWindowOpen) {
      onUpdateHabitName("");
    }
  }, [habitWindowOpen]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 font-semibold">Habit Name</span>
      <div className="flex gap-4 justify-between items-top">
        <input
          style={{
            backgroundColor: darkMode
              ? darkModeColor.secondaryBackground
              : lightModeColor.secondaryBackground,
          }}
          ref={inputRef}
          value={habitName}
          onChange={(event) => updateInputHabit(event)}
          className="w-full p-3 rounded-md bg-transparent border-2 border-gray-400 focus:border-gray-600 "
          placeholder="Type a name for the habit..."
        />
        <FontAwesomeIcon
          className="bg-customGreen mt-[0px] p-3 rounded-md text-black cursor-pointer h-full"
          icon={iconSelected}
          height={28}
          width={28}
          onClick={() => setOpenIconWindow(true)}
        />

        {/* <div
          className="bg-customGreen p-[0.6rem] rounded-md items-center cursor-pointer"
          onClick={() => setOpenIconWindow(true)}
        >
          <RunningIcon color="#000000" width="35" height="35" />
        </div> */}
      </div>
    </div>
  );
};

type RepeatOption = {
  name: string;
  selected: boolean;
};

type repeatProps = {
  onChangeOption: (repeatOptions: RepeatOption[]) => void;
  onChangeDaysOption: (allDays: DayOption[]) => void;
  onWeekChangeOption: (weeks: number) => void;
};

const Repeat = ({
  onChangeOption,
  onChangeDaysOption,
  onWeekChangeOption,
}: repeatProps) => {
  const [repeatOptions, setRepeatOptions] = useState([
    { name: "Daily", selected: true },
    { name: "Weekly", selected: false },
    { name: "Monthly", selected: false },
  ]);

  const days: DayOption[] = [
    { id: 0, name: "Everyday", selected: true },
    { id: 1, name: "Sun", selected: true },
    { id: 2, name: "Mon", selected: true },
    { id: 3, name: "Tue", selected: true },
    { id: 4, name: "Wed", selected: true },
    { id: 5, name: "Thu", selected: true },
    { id: 6, name: "Fri", selected: true },
    { id: 7, name: "Sat", selected: true },
  ];
  const [frequencySelected, setFrequencySelected] = useState<string>("Daily");
  const [allDays, setAllDays] = useState<DayOption[]>(days);
  const [weeks, setWeek] = useState<number>(1);

  const changeRepeatOption = (indexClicked: number) => {
    const updateRepeatOptions = repeatOptions.map((option, index) => {
      if (index === indexClicked) {
        option.selected = true;
      } else {
        option.selected = false;
      }
      return option;
    });

    setRepeatOptions(updateRepeatOptions);
    onChangeOption(updateRepeatOptions);
  };

  useEffect(() => {
    onChangeDaysOption(allDays);
  }, [allDays]);

  useEffect(() => {
    onWeekChangeOption(weeks);
  }, [weeks]);

  useEffect(() => {
    const getSelectedFrequency = repeatOptions.filter(
      (option) => option.selected
    )[0].name;

    setFrequencySelected(getSelectedFrequency);
    if (getSelectedFrequency === "Weekly" && weeks > 7) {
      setWeek(7);
    }
  }, [repeatOptions]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 text-[17px] font-semibold">Repeat</span>

      <div className="flex gap-4  items-center">
        {repeatOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => changeRepeatOption(index)}
            className={`p-3 rounded-md font-medium cursor-pointer ${
              option.selected
                ? `bg-customGreen text-black`
                : `bg-gray-100 text-gray-400 dark:bg-gray-700`
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>

      {frequencySelected === "Daily" ? (
        <DailyOptions allDays={allDays} setAllDays={setAllDays} />
      ) : (
        <WeeklyOption
          weeks={weeks}
          setWeek={setWeek}
          frequencySelected={frequencySelected}
        />
      )}
    </div>
  );
};

const DailyOptions = ({
  allDays,
  setAllDays,
}: {
  allDays: DayOption[];
  setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
}) => {
  const { darkMode, darkModeColor, lightModeColor } = useContext(UIContext);

  const selectedDays = (singleDayIndex: number) => {
    const updatedAllDays = [...allDays];

    if (singleDayIndex === 0) {
      // Select or deselect all days
      const selectAll = !allDays[0].selected; // Toggle based on the current state of "Everyday"
      updatedAllDays.forEach((day) => (day.selected = selectAll));
    } else {
      const selectedCount = updatedAllDays.filter((day) => day.selected).length;

      // Toggle the selected state of the specified day
      updatedAllDays[singleDayIndex].selected =
        !updatedAllDays[singleDayIndex].selected;

      // If it's the only one selected, do nothing to prevent all deselection
      if (selectedCount === 1 && !updatedAllDays[singleDayIndex].selected) {
        return;
      }

      // Check if all single days (1-7) are selected
      const allSelected = updatedAllDays.slice(1).every((day) => day.selected);
      updatedAllDays[0].selected = allSelected;
    }

    // Update the state with the new array
    setAllDays(updatedAllDays);
  };

  return (
    <div className="flex flex-col mt-5 gap-4">
      <span className="opacity-80 text-[17px] font-semibold">
        On These Days
      </span>
      <div className="flex flex-row flex-wrap gap-3">
        {allDays.map((singleDay, singleDayIndex) => (
          <span
            onClick={() => selectedDays(singleDayIndex)}
            style={{
              color: !singleDay.selected
                ? !darkMode
                  ? "#9ca3af"
                  : "#E4E1DA"
                : "#000000",
              backgroundColor: singleDay.selected
                ? lightModeColor.tertiary
                : darkMode
                ? "#374151"
                : "#f3f4f6",
            }}
            key={singleDayIndex}
            className={` flex-1 p-2 px-3 text-center rounded-md font-medium select-none cursor-pointer text-[14px]  ${
              singleDay.selected ? "text-white" : "text-gray-400"
            } ${singleDayIndex === 0 ? "w-full max-sm:order-last" : "w-fit"}`}
          >
            {singleDay.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const WeeklyOption = ({
  weeks,
  setWeek,
  frequencySelected,
}: {
  weeks: number;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
  frequencySelected: string;
}) => {
  const { darkMode, darkModeColor, lightModeColor } = useContext(UIContext);

  const updateCounter = (option: string) => {
    if (frequencySelected === "Weekly") {
      if (option === "add") {
        setWeek((prev) => (prev < 7 ? prev + 1 : 7));
      }
      if (option === "subtract") {
        setWeek((prev) => (prev > 1 ? prev - 1 : 1));
      }
    } else if (frequencySelected === "Monthly") {
      if (option === "add") {
        setWeek((prev) => (prev < 31 ? prev + 1 : 31));
      }

      if (option === "subtract") {
        setWeek((prev) => (prev > 1 ? prev - 1 : 1));
      }
    }
  };

  return (
    <div className="mt-7 flex gap-20 max-sm:gap-10 max-sm:justify-between ">
      <div className="flex flex-col gap-2">
        <span className="opacity-80 text-[17px] font-semibold">Frequency</span>
        <span className="text-sm font-medium text-gray-500 text-nowrap">
          {weeks} times a {frequencySelected === "Monthly" ? "month" : "week"}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => updateCounter("subtract")}
          style={{
            backgroundColor: darkMode
              ? darkModeColor.secondaryBackground
              : lightModeColor.secondaryBackground,
            color: darkMode ? darkModeColor.text : lightModeColor.text,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          {" "}
          -{" "}
        </button>
        <span className="p-4 px-5 select-none">{weeks}</span>
        <button
          onClick={() => updateCounter("add")}
          style={{
            backgroundColor: darkMode
              ? darkModeColor.secondaryBackground
              : lightModeColor.secondaryBackground,
            color: darkMode ? darkModeColor.text : lightModeColor.text,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

const Reminder = ({ habitItem, setHabitItem }: { habitItem: HabitType;  setHabitItem: React.Dispatch<React.SetStateAction<HabitType>>} ) => {
  const {
    darkMode,
    darkModeColor,
    lightModeColor,
    timePickerWindowOpen,
    setTimePickerWindowOpen,
  } = useContext(UIContext);
  const [reminder, setReminder] = useState<boolean>(false);

  const updateToggle = () => {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.isNotificationOn = !reminder;
    setHabitItem(copyHabitItem);
    setReminder(!reminder);
    if (copyHabitItem.isNotificationOn === false) {
      copyHabitItem.notificationTime = "";
      setHabitItem(copyHabitItem);
      setTimePickerWindowOpen(false)
    };
  }



  const handleTimePickerClick = () => {
    setTimePickerWindowOpen(true);
  };
  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <div className="flex justify-between">
        <span className="font-semibold text-[17px] opacity-80">
          Notification
        </span>
        <IOSSwitch checked={reminder} onChange={updateToggle} size="medium" />
      </div>

      {reminder && (
        <div
          style={{
            backgroundColor: darkMode
              ? darkModeColor.background
              : lightModeColor.background,
            color: darkMode ? darkModeColor.text : lightModeColor.text,
          }}
          className="flex justify-between p-4 m-2 mt-8 rounded-md"
        >
          <span className="font-semibold">Select Time</span>
          <div
            className="flex gap-2 items-center justify-center cursor-pointer select-none"
            onClick={handleTimePickerClick}
          >
            <span className="font-semibold">{habitItem.notificationTime ? habitItem.notificationTime : "none" }</span>
            <FontAwesomeIcon icon={faChevronDown} height={12} width={12} />
          </div>
        </div>
      )}
    </div>
  );
};

const SaveButton = ({ habit }: { habit: HabitType }) => {
  const { allHabits, setAllHabits, addNewHabit } = useContext(HabitsContext);
  const { setHabitWindowOpen } = useContext(UIContext);

  function checkNewHabitObject() {
    if (habit.name.trim() === "") {
      return toast.error("The habit name is empty");
    }
    const habitExist = allHabits.some((singleHabit) => singleHabit.name === habit.name);
    if (!habitExist) {
      addNewHabit({ allHabits, setAllHabits, newHabit: habit });
      setHabitWindowOpen(false);
  } else {
      toast.error("Habit already exists!");
    }
  }
  return (
    <div className="w-full flex justify-center mt-9">
      <button
        onClick={checkNewHabitObject}
        className="bg-customGreen text-black text-xl font-semibold p-4 rounded-md w-[98%]"
      >
        Add Habit
      </button>
    </div>
  );
};

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);
