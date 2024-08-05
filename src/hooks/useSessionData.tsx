import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface UserData {
  steamID: string;
  username: string;
}

const useSessionData = () => {
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    axios
      .get<{ user: UserData }>(
        "https://game-array.onrender.com/api/v1/session",
        {
          signal: controller.signal,
          withCredentials: true,
        }
      )
      .then((res) => {
        // Sets userData to user session object, created in Passport.js in Express backend
        setUserData(res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);
  return { userData, error, isLoading };
};

export default useSessionData;
