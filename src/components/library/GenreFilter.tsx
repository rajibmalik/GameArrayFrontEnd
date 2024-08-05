import { Select } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";

const popularGenres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Puzzle",
  "Sports",
  "Casual",
  "Indie",
];

interface Props {
  onGenreChange: (genre: string) => void;
}

const GenreFilter = ({ onGenreChange }: Props) => {
  return (
    <Select
      minWidth={"75px"}
      maxWidth={"125px"}
      icon={<IoMdArrowDropdown />}
      backgroundColor={"#FEFFFF"}
      borderColor={"black"}
      placeholder="GENRE"
      onChange={(event) => onGenreChange(event.target.value)}
      color={"black"}
    >
      {popularGenres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </Select>
  );
};

export default GenreFilter;
