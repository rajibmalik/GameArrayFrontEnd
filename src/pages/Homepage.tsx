import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import AuthButton from "../components/homepage/AuthButton";
import InfoContainer from "../components/homepage/InfoContainer";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <Grid
      templateAreas={`
     
      "welcome welcome"
      "login-button login-button"
      "subheading subheading"
      "info-box-one info-box-two"
      "footer footer"
      `}
      gridTemplateRows={"1fr 1fr 1fr 4fr 1fr "}
      gridTemplateColumns={"1fr 1fr"}
      maxHeight="100vh"
      maxWidth="100vw"
      gap={1}
    >
      <GridItem area="welcome">
        <Heading size={"xl"} textAlign={"center"} p={5}>
          WELCOME TO GAME ARRAY
        </Heading>
      </GridItem>
      <GridItem area="login-button">
        <Box display={"flex"} justifyContent={"center"}>
          <AuthButton />
        </Box>
      </GridItem>
      <GridItem area="subheading">
        <Heading size={"xl"} textAlign={"center"}>
          TO ACCESS YOUR
        </Heading>
      </GridItem>
      <GridItem area="info-box-one" margin={10}>
        <InfoContainer
          header={"LIBRARY"}
          image={"/images/Library.png"}
          text={
            "Search and filter games by genre, sort your collection, view achievement progress and playtime, and launch your favorite games."
          }
        />
      </GridItem>
      <GridItem area="info-box-two" margin={10}>
        <InfoContainer
          header={"DASHBOARD"}
          image={"/images/Dashboard.png"}
          text={"View graphs visualising your gaming data"}
        />
      </GridItem>
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Homepage;
