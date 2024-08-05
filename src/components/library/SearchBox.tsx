import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import SortBy from "./SortBy";

interface Props {
  onSearch: (searchText: string) => void;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
}

const SearchBox = ({ onSearch, onGenreChange, onSortChange }: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
    >
      <GenreFilter onGenreChange={onGenreChange} />
      <SearchBar onSearch={onSearch} />
      <SortBy onSortChange={onSortChange} />
    </Box>
  );
};

export default SearchBox;
