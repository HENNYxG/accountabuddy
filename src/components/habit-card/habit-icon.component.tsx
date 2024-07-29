import RunningIcon from "../../assets/icons/running-icon";
import { useState } from "react";
import { customCharcoal } from "../../utils/colors";

const HabitIcon = () => {
    const [isClicked, setIsClicked] = useState(false)

    const onClickHandler = () => {
        setIsClicked(!isClicked);
        console.log("Iwasclicked")
    }
    return (
      <div onClick={onClickHandler}>
        <RunningIcon color={ customCharcoal } width="60px" height="60px" />
      </div>
    );
}

export default HabitIcon;

