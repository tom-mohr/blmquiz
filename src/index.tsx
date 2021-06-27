import * as ReactDOM from "react-dom";
import * as React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {MainComponent} from "./components/MainComponent";

const theme = createMuiTheme({
  palette: {
    primary: {
      //light: '#757ce8',
      main: '#a88a49',
      //dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
<ThemeProvider theme={theme}>
  <MainComponent/>
</ThemeProvider>, document.getElementById("root"));
