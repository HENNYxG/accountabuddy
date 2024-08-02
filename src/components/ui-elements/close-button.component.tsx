import XIcon from "../../assets/icons/x-icon";

const CloseButton = (props:any) => {
    return (
        <div onClick={props.onClick}
            className={`text-gray-300 cursor-pointer p-1 hover:bg-zinc-200 rounded-md dark:hover:bg-zinc-700 transition ${props.className}`}
      >
        <XIcon width="24" height="24" />
      </div>
    );
}

export default CloseButton;