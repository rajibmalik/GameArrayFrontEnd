import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      bg={"gray.800"}
      textAlign={"center"}
      py={4}
    >
      <Text>© {new Date().getFullYear()} GameArray</Text>
    </Box>
  );
};

export default Footer;
