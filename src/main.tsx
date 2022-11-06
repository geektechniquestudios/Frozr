import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { Auth } from "./containers/Auth"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import "./index.scss"

const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#15803d",
//     },
//     secondary: {
//       main: "#f43f5e",
//     },
//     background: {
//       default: "#192231",
//       paper: "#24344d",
//     },
//   },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth.Provider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth.Provider>
  </React.StrictMode>,
)
