import { extendTheme, theme } from "@chakra-ui/react";

const extendedTheme = extendTheme({
  colors: {
    white: theme.colors.white,
    black: theme.colors.black,
    primary: theme.colors.teal,
    secondary: theme.colors.orange,
    error: theme.colors.red,
    warning: theme.colors.yellow,
  },
});

export default extendedTheme;
