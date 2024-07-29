import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { defaultColor } from "../../utils/colors";
import { MenuContext } from "../../contexts/menu.context";
import { useContext } from "react";

const CalendarMUI = () => {
        const { darkMode, darkModeColor, lightModeColor } =
          useContext(MenuContext);
  
    return (
      <div
        style={{
          backgroundColor: darkMode
            ? darkModeColor.secondaryBackground
            : lightModeColor.secondaryBackground,
        }}
        className="flex flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl p-1 pt-7"
      >
        <DateCalendar
          sx={{
            "& .MuiPickersDay-root": {
              color: darkMode ? darkModeColor.text : lightModeColor.text,
              "&.Mui-selected": {
                backgroundColor: defaultColor.default,
                color: "white",
              },
            },
            "& .MuiPickersYear-yearButton": {
              color: darkMode ? darkModeColor.text : lightModeColor.text,
              "&.Mui-selected": {
                backgroundColor: defaultColor.default,
                color: "white",
              },
            },
          }}
        />
      </div>
    );
}

export default CalendarMUI;