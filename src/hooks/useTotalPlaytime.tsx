import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import useSessionData from "./useSessionData";

interface FetchTotalPlaytimeResponse {
  data: {
    totalPlaytime: number;
    numberOfGames: number;
  };
}

const useTotalPlaytime = () => {
  const { userData, error: sessionError } = useSessionData();
  const [totalPlaytime, setTotalPlaytime] = useState<number>();
  const [totalGames, setTotalGames] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (userData) {
      const controller = new AbortController();

      setIsLoading(true);

      axios
        .get<FetchTotalPlaytimeResponse>(
          `https://game-array.onrender.com/api/v1/usergames/total-playtime/${userData.steamID}`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        .then((res) => {
          // Sets userData to user session object, created in Passport.js in Express backend
          setTotalPlaytime(res.data.data.totalPlaytime);
          setTotalGames(res.data.data.numberOfGames);
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

  return { totalPlaytime, totalGames, isLoading, error };
};

export default useTotalPlaytime;
