import { Select } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";

const sortOptions = [
  { value: "playtime", label: "Playtime" },
  { value: "name", label: "A-Z" },
];

interface Props {
  onSortChange: (sort: string) => void;
}

const SortBy = ({ onSortChange }: Props) => {
  return (
    <Select
      minWidth={"75px"}
      maxWidth={"125px"}
      icon={<IoMdArrowDropdown />}
      backgroundColor={"#FEFFFF"}
      borderColor={"black"}
      placeholder="SORT BY"
      onChange={(event) => onSortChange(event.target.value)}
      color={"black"}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SortBy;
