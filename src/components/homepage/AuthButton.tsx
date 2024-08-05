import { Button, Icon } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";

const AuthButton = () => {
  const handleAuth = () => {
    window.location.href = "https://game-array.onrender.com/auth/steam";
  };

  return (
    <Button
      leftIcon={<Icon as={FaSteam} boxSize="3rem" />}
      textColor={"white"}
      bgColor="#17252A"
      variant={"solid"}
      size={"lg"}
      onClick={handleAuth}
      _hover={{ bgColor: "#17252A" }}
      p={10}
    >
      LOGIN WITH STEAM
    </Button>
  );
};

export default AuthButton;
