import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props {
  onSearch: (searchText: string) => void;
}

const sanitizeInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove special characters, except spaces
};

const SearchBar = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onChange={(event) => {
        event.preventDefault();
        if (ref.current) {
          const sanitizedSearchText = sanitizeInput(ref.current.value);
          onSearch(sanitizedSearchText);
        }
      }}
    >
      <InputGroup
        overflow={"hidden"}
        borderRadius={2}
        borderWidth={1}
        width={"100%"}
        borderColor={"black"}
      >
        <Input
          pl="10px"
          backgroundColor={"#FEFFFF"}
          textColor={"black"}
          ref={ref}
          variant="unstyled"
          placeholder="Search game"
          size="lg"
        ></Input>
        <InputRightElement h="100%">
          <FaMagnifyingGlass color="black" />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
