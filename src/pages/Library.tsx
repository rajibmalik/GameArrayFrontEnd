import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GameGrid from "../components/library/GameGrid";
import useSessionData from "../hooks/useSessionData";
import { useEffect, useState } from "react";
import SearchBox from "../components/library/SearchBox";
import Footer from "../components/Footer";

export interface GameQuery {
  steamID: string | null;
  username: string | null;
  searchText: string;
  genre: string;
  sort: string;
}

const Library = () => {
  const { userData, error, isLoading } = useSessionData();
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  // Set userData in gameQuery
  useEffect(() => {
    if (userData) {
      setGameQuery((prevGameQuery) => ({
        ...prevGameQuery,
        steamID: userData.steamID,
        username: userData.username,
      }));
    }
  }, [userData]);

  // Update gameQuery with searchText when input is given
  const handleSearch = (searchText: string) => {
    setGameQuery((prevGameQuery) => ({
      ...prevGameQuery,
      searchText: searchText,
    }));
  };

  const handleGenreChange = (genre: string) => {
    console.log(genre);
    setGameQuery((prevGameQuery) => ({
      ...prevGameQuery,
      genre: genre,
    }));
  };

  const handleSortChange = (sort: string) => {
    console.log(sort);
    setGameQuery((prevGameQuery) => ({
      ...prevGameQuery,
      sort: sort,
    }));
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "search-bar" "main" "footer"`,
      }}
    >
      <GridItem top={0} zIndex={20} position={"sticky"} area="nav">
        <NavBar />
      </GridItem>
      <GridItem display={"flex"} justifyContent={"center"} area="search-bar">
        <Box
          margin={10}
          backgroundColor={"#F1F4F7"}
          display={"flex"}
          width={"75%"}
          justifyContent={"center"}
          p={5}
          borderColor={"black"}
          borderRadius={5}
          borderWidth={1}
        >
          <SearchBox
            onSearch={handleSearch}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
          />
        </Box>
      </GridItem>
      <GridItem area="main">
        {isLoading && <Text>Loading</Text>}
        {error && <p>Error loading: {error}</p>}
        {userData && <GameGrid gameQuery={gameQuery} />}
      </GridItem>

      <GridItem area="footer" backgroundColor={"blue"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Library;
