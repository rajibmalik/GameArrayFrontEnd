import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { GameQuery } from "../pages/Library";

// The interface for a UserGame object that is retrieved from the
// `/usergames/`${steamID}`endpoint, this is the data we are
// in the library section
export interface UserGame {
  appid: string;
  playtimeHours: number;
  name: string;
  headerImage: string;
  totalAchievements: number;
  acquiredAchievements: number;
}

// The interface for the response data
interface fetchUserGamesResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    userGames: UserGame[];
  };
}

const useUserGames = ({ steamID, searchText, genre, sort }: GameQuery) => {
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    const baseUrl = `/usergames/${steamID}`;

    // Create URLSearchParams object for query parameters
    const params = new URLSearchParams();
    if (searchText) params.append("searchtext", searchText);
    if (genre) params.append("genre", genre);
    if (sort) params.append("sort", sort);

    // Constructs full URL with base and query parameters
    const url = `${baseUrl}?${params.toString()}`;

    apiClient
      .get<fetchUserGamesResponse>(url, {
        signal: controller.signal,
      })
      .then((res) => {
        setUserGames(res.data.data.userGames);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [steamID, searchText, genre, sort]);

  return { userGames, error, isLoading };
};

export default useUserGames;
