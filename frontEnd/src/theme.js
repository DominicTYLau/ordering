import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
  } from "@mui/material";
  import React from "react";
  
  const appTheme = createTheme({
    palette: {
      primary: {
        main: "rgba(26, 73, 242, 1)",
      },
      secondary: {
        main: "rgba(101, 85, 143, 1)",
      },
      error: {
        main: "rgba(179, 38, 30, 1)",
      },
      background: {
        default: "rgba(254, 247, 255, 1)",
      },
      text: {
        primary: "rgba(29, 27, 32, 1)",
        secondary: "rgba(73, 69, 79, 1)",
      },
    },
    typography: {
      fontFamily: "Roboto, Poppins, Helvetica",
      h1: {
        fontSize: "45px",
        fontWeight: 400,
        letterSpacing: "0px",
      },
      h2: {
        fontSize: "36px",
        fontWeight: 400,
        letterSpacing: "0px",
      },
      subtitle1: {
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.1px",
      },
      body1: {
        fontSize: "16px",
        fontWeight: 400,
        letterSpacing: "0px",
      },
      button: {
        fontSize: "18px",
        fontWeight: 600,
        letterSpacing: "0px",
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.h2,
          }),
          head: ({ theme }) => ({
            ...theme.typography.subtitle1,
          }),
          body: ({ theme }) => ({
            ...theme.typography.body1,
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: ({ theme }) => ({
            ...theme.typography.h2,
          }),
          secondary: ({ theme }) => ({
            ...theme.typography.body1,
          }),
        },
      },
    },
  });
  
  export const ThemeProvider = ({ children }) => {
    return (
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  };
  