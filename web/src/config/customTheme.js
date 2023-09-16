import { createTheme } from "@mui/material";
import BricolageGrotesque from "../assets/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf";

const theme = createTheme({
  palette: {
    primary: {
      hoverText: "#FF6000",
      main: "#454545",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FF6000",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'Bricolage Grotesque';
              font-style: normal;
              font-display: swap;
              src: local('Bricolage Grotesque'), local('Bricolage Grotesque'), url(${BricolageGrotesque}) format('truetype');
            }
          `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: ["Bricolage Grotesque", "sans-serif"].join(", "),
  },
});

export default theme;
