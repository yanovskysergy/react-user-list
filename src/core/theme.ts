import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '20px'
        }
      }
    },
  }
})