import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { GroupType } from "../../types/habitsContextType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HabitsContext } from "../../contexts/habits.context";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, selectedNames: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({onChange}: {onChange: (selectedGroupItems: any) => void}) {
  const theme = useTheme();
  const { habitGroups = [] }: { habitGroups: GroupType[] } = React.useContext(HabitsContext) || { habitGroups: [] };

  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [selectedGroupItems, setSelectedGroupItems] = React.useState<any>([]);


  const handleChange = (event: SelectChangeEvent<typeof selectedGroups>) => {
    const {
      target: { value },
    } = event;
    setSelectedGroups(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //Filter out the ALL Element
  const filteredGroups = habitGroups.filter((group) => group.name !== "All");

  //Save the whole object matching the name is the selected groups array
  React.useEffect(() => {
    const selectedGroupObjects = selectedGroups.map((selectedGroup) => {
      
      return habitGroups.find((group) => group.name === selectedGroup);
    });
    setSelectedGroupItems(selectedGroupObjects);
  }, [selectedGroups]);

  //use callback onchange to pass up the selectedAreaItems to parent everytime it changes
  React.useEffect(() => {
    onChange(selectedGroupItems);
  }, [selectedGroupItems]);

  return (
    <div>
      <FormControl sx={{
        m: 1,
        width: "100%",
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
              color: "#E9FF20",
            },
          }}
          id="demo-multiple-chip-label"
        >
          Choose Your Group...
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGroups}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Choose your group..."
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E9FF20",
                },
              }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredGroups.map((group) => (
            <MenuItem
              key={group.id}
              value={group.name}
              style={getStyles(group.name, selectedGroups, theme)}
            >
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
    </div>
  );
}
