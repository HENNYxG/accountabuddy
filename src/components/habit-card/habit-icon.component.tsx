import RunningIcon from "../../assets/icons/running-icon";
import { useState } from "react";

const HabitIcon = () => {
    const [isClicked, setIsClicked] = useState(false)

    const onClickHandler = () => {
        setIsClicked(!isClicked);
        console.log("Iwasclicked")
    }
    return (
      <div onClick={onClickHandler}>
        <RunningIcon color="#fff" width="60px" height="60px" />
      </div>
    );
}

export default HabitIcon;

