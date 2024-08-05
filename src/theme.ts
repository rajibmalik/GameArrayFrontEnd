import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Verdana",
    body: "Verdana",
  },
  styles: {
    global: {
      body: {
        bg: "#2B7A78",
        color: "white",
      },
    },
  },
});

export default theme;
