import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GroupType } from "../../types/habitsContextType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HabitsContext } from "../../contexts/habits.context";


export default function BasicSelect({
  onChange,
}: {
  onChange: (selectedGroupItems: any) => void;
}) {
  const { habitGroups = [] }: { habitGroups: GroupType[] } = React.useContext(
    HabitsContext
  ) || { habitGroups: [] };

  const [selectedGroup, setSelectedGroup] = React.useState<string>("");
  const [selectedGroupItem, setSelectedGroupItem] = React.useState<any>(null);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedGroup(selectedValue);

    const selectedGroupObject = habitGroups.find(
      (group) => group.name === selectedValue
    );
    setSelectedGroupItem(selectedGroupObject);
  };

  // Filter out the "All" element
  const filteredGroups = habitGroups.filter((group) => group.name !== "All");

  // Use callback onChange to pass up the selectedGroupItem to parent every time it changes
  React.useEffect(() => {
    onChange(selectedGroupItem);
  }, [selectedGroupItem]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        sx={{
          "& .Mui-focused .MuiInputLabel-root": {
            color: "#E9FF20",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E9FF20",
          },
        }}
      >
        <InputLabel
          sx={{
            "&.Mui-focused": {
              color: "#27272A",
            },
          }}
          id="demo-simple-select-label"
        >
          Choose Your Group...
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedGroup}
          label="Choose Your Group..."
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E9FF20",
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filteredGroups.map((group) => (
            <MenuItem key={group.id} value={group.name}>
              <FontAwesomeIcon
                className="text-customCharcoal"
                icon={group.icon}
                style={{ marginRight: 8 }}
              />
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
