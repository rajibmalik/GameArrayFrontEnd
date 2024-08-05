import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const LogOutButton = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    apiClient
      .post("/session/logout")
      .then(() => {
        localStorage.removeItem("userToken");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  return (
    <Button
      onClick={handleLogOut}
      bg={"#FEFFFF"}
      size={"sm"}
      padding={5}
      borderRadius={"md"}
      margin={"5px"}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
