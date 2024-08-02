import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { UIContext } from "../../contexts/ui.context";
import CloseButton from "./close-button.component";

type TimeValue = {
  text: string;
  selected: boolean;
};

interface TimerPickerProps {
  onSaveTime: (time: string) => void;
}

const TimerPicker: React.FC<TimerPickerProps> = ({ onSaveTime }) => {
  const {
    darkMode,
    darkModeColor,
    lightModeColor,
    timePickerWindowOpen,
    setTimePickerWindowOpen,
  } = useContext(UIContext);
    


  const [time, setTime] = useState<TimeValue[]>([
    { text: "11", selected: true },
    { text: "12", selected: false },
  ]);

  const [timeOfDay, setTimeOfDay] = useState([
    { text: "AM", selected: true },
    { text: "PM", selected: false },
  ]);

  //Refs
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  //Update AM or PM
  const updateTimeOfDay = (clickedIndex: number) => {
    const updateTOD = timeOfDay.map((tod, index) => {
      if (index === clickedIndex) {
        return { ...tod, selected: true };
      }
      return { ...tod, selected: false };
    });
    setTimeOfDay(updateTOD);
  };

  //Update Time
  const updateTime = (clickedIndex: number) => {
    const updateTimeValues = time.map((t, index) => {
      if (index === clickedIndex) {
        return { ...t, selected: true };
      }
      return { ...t, selected: false };
    });
    setTime(updateTimeValues);
  };

  const updateTimeValuesText = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const timesValuesCopy = [...time];
    const currentText = e.target.value;
    const parsedValue = parseInt(currentText, 10);

    //check if input only has numbers
    const isNumeric = /^\d*$/.test(currentText);
    const isValidInput = (
      currentText: string,
      parsedValue: number,
      index: number
    ) => {
      if (
        (index === 0 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 12) ||
        (index === 1 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 59) ||
        currentText === ""
      ) {
        return true;
      }
      return false;
    };

    if (isNumeric && isValidInput(currentText, parsedValue, index)) {
      timesValuesCopy[index].text = currentText;
      setTime(timesValuesCopy);
    }
  };

  const handleOnBlur = (index: number) => {
    const timesValuesCopy = [...time];
    const currentText = timesValuesCopy[index].text;

    if (currentText === "") {
      timesValuesCopy[index].text = "00";
    } else if (currentText.length === 1) {
      timesValuesCopy[index].text = `0${currentText}`;
    }

    setTime(timesValuesCopy);
  };

  const saveTime = () => {
    const timeOfDaySelected = timeOfDay.filter((tod) => tod.selected)[0].text;

    const selectedTimeFormatted = `${time[0].text}:${time[1].text} ${timeOfDaySelected}`;

    onSaveTime(selectedTimeFormatted);
    setTimePickerWindowOpen(false);
  };
  //select hours or minutes input field on open
  useEffect(() => {
    if (timePickerWindowOpen) {
      if (time[0].selected) {
        hoursRef.current?.focus();
      } else if (time[1].selected) {
        minutesRef.current?.focus();
      }
    }
  }, [timePickerWindowOpen]);

  //update time to current time
  useEffect(() => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTOD = currentHours >= 12 ? 1 : 0;

    const updatedTime = [
      {
        // text: currentHours > 12 ? `${currentHours - 12}` : `${currentHours}`,
        text:
          currentHours > 12
            ? `${currentHours - 12 < 10 ? "0" : ""}${currentHours - 12}`
            : `${currentHours < 10 ? "0" : ""}${currentHours}`,
        selected: true,
      },
      {
        text: currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`,
        selected: false,
      },
    ];
    const updatedTOD = timeOfDay.map((tod, index) => {
      if (index === currentTOD) {
        return { ...tod, selected: true };
      }
      return { ...tod, selected: false };
    });

    setTime(updatedTime);
    setTimeOfDay(updatedTOD);
  }, [timePickerWindowOpen]);

  return (
    <div
      className={`bg-white dark:bg-customStone w-[413px] top-[89px] left-1/2 transform -translate-x-1/2 z-[70] p-7 rounded-md shadow-md ${
        timePickerWindowOpen ? "absolute" : "hidden"
      }`}
    >
      {/* Select Time + Closing Icon */}
      <span className="font-medium text-xl flex justify-between items-center">
        {/* Select Time */}
        <span> Select Time </span>
        <CloseButton
          onClick={() => setTimePickerWindowOpen(false)}
          className="absolute top-3 right-4"
        />
      </span>

      {/* Input Fields */}
      <div className="flex gap-8 mt-9">
        <div className="flex gap-2 justify-center items-center">
          {/* Hours Field */}
          <input
            value={time[0].text}
            onClick={() => updateTime(0)}
            ref={hoursRef}
            onChange={(e) => {
              updateTimeValuesText(e, 0);
            }}
            onBlur={() => handleOnBlur(0)}
            readOnly={!time[0].selected}
            style={{
              backgroundColor: time[0].selected
                ? !darkMode
                  ? "#f5ff97"
                  : darkModeColor.secondaryBackground
                : lightModeColor.background,
              color: time[0].selected
                ? !darkMode
                  ? lightModeColor.text
                  : darkModeColor.text
                : lightModeColor.text,
            }}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />
          <span className="text-2xl font-bold">:</span>

          {/* Minutes Field */}
          <input
            value={time[1].text}
            onClick={() => updateTime(1)}
            ref={minutesRef}
            onChange={(e) => {
              updateTimeValuesText(e, 1);
            }}
            onBlur={() => handleOnBlur(1)}
            readOnly={!time[1].selected}
            style={{
              backgroundColor: time[1].selected
                ? !darkMode
                  ? "#f5ff97"
                  : darkModeColor.secondaryBackground
                : lightModeColor.background,
              color: time[1].selected
                ? !darkMode
                  ? lightModeColor.text
                  : darkModeColor.text
                : lightModeColor.text,
            }}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />
        </div>
        {/* AM or PM Options */}
        <div className="flex flex-col gap-3">
          {timeOfDay.map((tod, index) => (
            <span
              key={index}
              onClick={() => updateTimeOfDay(index)}
              style={{
                backgroundColor: tod.selected
                  ? darkMode
                    ? darkModeColor.secondaryBackground
                    : "#f5ff97"
                  : lightModeColor.background,
                color: tod.selected
                  ? darkMode
                    ? darkModeColor.text
                    : lightModeColor.text
                  : lightModeColor.text,
              }}
              className="text-xl flex justify-center items-center w-[104px] h-[45px] rounded-md cursor-pointer select-none"
            >
              {tod.text}
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        className="bg-customGreen p-3 text-black font-semibold w-full rounded-md mt-10 mb-1"
        onClick={saveTime}
      >
        Save
      </button>
    </div>
  );
};
export default TimerPicker;
