import { Box, Heading, Img, Text } from "@chakra-ui/react";

interface Props {
  header: string;
  image: string;
  text: string;
}

const InfoContainer = ({ header, image, text }: Props) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      backgroundColor={"#17252A"}
      borderRadius={20}
      padding={5}
    >
      <Heading textAlign={"center"}> {header}</Heading>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Img src={image} p={10}></Img>
      </Box>
      <Text
        display={"flex"}
        p={5}
        fontSize={"lg"}
        justifyContent={"center"}
        fontWeight={"bold"}
      >
        {text}
      </Text>
    </Box>
  );
};

export default InfoContainer;
