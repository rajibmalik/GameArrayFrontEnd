import { http, HttpResponse } from "msw";

interface UserResponse {
  steamID: string;
  username: string;
}

interface UserGamesResponse {
  appid: string;
  name: string;
  genres: string[];
  playtimeHours: number;
  totalAchievements: number | null;
  acquiredAchievements: number;
  headerImage: string;
}

// Database
const userGamesDatabase: Record<string, UserGamesResponse[]> = {
  "76561197960287930": [
    {
      appid: "1",
      name: "Game One",
      genres: ["Action", "RPG"],
      playtimeHours: 10,
      totalAchievements: 100,
      acquiredAchievements: 50,
      headerImage: "imageOne",
    },
    {
      appid: "2",
      name: "Game Two",
      genres: ["Strategy"],
      playtimeHours: 20,
      totalAchievements: 100,
      acquiredAchievements: 20,
      headerImage: "imageTwo",
    },
    {
      appid: "3",
      name: "Game Three",
      genres: ["Action"],
      playtimeHours: 5,
      totalAchievements: 100,
      acquiredAchievements: 30,
      headerImage: "imageThree",
    },
  ],
};

export const handlers = [
  http.get("/api/v1/session", () => {
    return HttpResponse.json<UserResponse>({
      steamID: "76561197960287930",
      username: "testUser",
    });
  }),

  // "http://127.0.0.1:3000/api/v1"
  // This mocks the endpoint responsible for retrieving userGames based on
  // the query a user makes to the Express endpoint
  http.get(
    "http://127.0.0.1:3000/api/v1/usergames/:steamid",
    ({ params, request }) => {
      const steamid = params.steamid as string; // Ensure steamid is a string
      const url = new URL(request.url);
      const searchText = url.searchParams.get("searchtext");
      const genre = url.searchParams.get("genre");
      const sort = url.searchParams.get("sort");

      // Retrieve user games based on steamid
      let games: UserGamesResponse[] = userGamesDatabase[steamid] || [];

      // Filter by searchText
      if (searchText) {
        games = games.filter((game) =>
          game.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // Filter by genre
      if (genre) {
        games = games.filter((game) =>
          game.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
        );
      }

      // Sort games
      if (sort) {
        switch (sort.toLowerCase()) {
          case "playtime":
            games.sort((a, b) => b.playtimeHours - a.playtimeHours);
            break;
          case "name":
            games.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }

      return HttpResponse.json<{
        status: string;
        results: number;
        data: { userGames: UserGamesResponse[] };
      }>({
        status: "success",
        results: games.length,
        data: {
          userGames: games,
        },
      });
    }
  ),
];
