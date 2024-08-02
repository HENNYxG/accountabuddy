import MultipleSelectChip from "../ui-elements/multi-select-chip-dropdown.component";
import BasicSelect from "../ui-elements/single-select-dropdown.component";

const HabitWindowGroup = ({onChange}: {onChange: (selectedItems: any) => void}) => {
    const getSelectedItems = (selectedItems: any) => {
        onChange(selectedItems);
    }

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="font-semibold text-[17px] opacity-80">Groups</span>
            <BasicSelect onChange={getSelectedItems} />
        </div>
    )
};

export default HabitWindowGroup;
