import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useUserGames from "../../hooks/useUserGames";
import GameCard from "./GameCard";
import { GameQuery } from "../../pages/Library";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { userGames, error, isLoading } = useUserGames(gameQuery);

  return (
    <>
      {isLoading && (
        <Box textAlign="center" padding="50px">
          <Spinner
            size="xl"
            color="blue.500"
            speed="0.65s"
            thickness="5px"
            data-testid="loading-spinner"
          />
        </Box>
      )}

      {error && <Text>{error}</Text>}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="25px"
        spacing={10}
      >
        {userGames.map((game) => (
          <GameCard key={game.appid} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
