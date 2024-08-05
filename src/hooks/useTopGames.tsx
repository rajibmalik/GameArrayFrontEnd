import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import useSessionData from "./useSessionData";
import { UserGame } from "./useUserGames";

interface fetchTopGamesResponse {
  results: number;
  data: {
    userGames: UserGame[];
  };
}

const useTopGames = () => {
  const { userData, error: sessionError } = useSessionData();
  const [topGames, setTopGames] = useState<UserGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (userData) {
      const controller = new AbortController();

      setIsLoading(true);

      axios
        .get<fetchTopGamesResponse>(
          `https://game-array.onrender.com/api/v1/usergames/top-10-by-playtime/${userData.steamID}`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        .then((res) => {
          // Sets userData to user session object, created in Passport.js in Express backend
          setTopGames(res.data.data.userGames);
          console.log("HERE:", res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setIsLoading(false);
        });

      return () => controller.abort();
    } else if (sessionError) {
      setError(sessionError);
    }
  }, [userData]);

  return { topGames, isLoading, error };
};

export default useTopGames;
