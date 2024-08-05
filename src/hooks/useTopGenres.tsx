import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import useSessionData from "./useSessionData";

export interface TopGenres {
  genre: string;
  totalPlaytime: number;
  totalPlaytimeHours: number;
}

interface fetchDashboardDataResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    topGenres: TopGenres[];
  };
}

const useTopGenres = () => {
  const { userData, error: sessionError } = useSessionData();
  const [topGenres, setTopGenres] = useState<TopGenres[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (userData) {
      const controller = new AbortController();

      setIsLoading(true);

      axios
        .get<fetchDashboardDataResponse>(
          `https://game-array.onrender.com/api/v1/usergames/top-genres-by-playtime/${userData.steamID}/6`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        .then((res) => {
          // Sets userData to user session object, created in Passport.js in Express backend
          setTopGenres(res.data.data.topGenres);
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

  return { topGenres, isLoading, error };
};

export default useTopGenres;
