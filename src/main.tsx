import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { Auth } from "./containers/Auth"
import { createTheme, ThemeProvider } from "@mui/material/styles"
//@ts-ignore
import { registerSW } from "virtual:pwa-register"
import { Form } from "./containers/Form"
import { Wallet } from "./containers/Wallet"
import "./index.scss"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#93c5fd", // tailwind blue 300
    },
    background: {
      default: "#192231",
      paper: "#24344d",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth.Provider>
      <Form.Provider>
        <Wallet.Provider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Wallet.Provider>
      </Form.Provider>
    </Auth.Provider>
  </React.StrictMode>,
)

registerSW({})
