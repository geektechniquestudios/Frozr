import * as React from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { MainContent } from "./components/MainContent"
import { createTheme, ThemeProvider } from "@mui/material/styles"

export const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: '#15803d',
          },
          secondary: {
            main: '#f43f5e',
          },
          background: {
            default: '#192231',
            paper: '#24344d',
          },
        },
      })}
    >
      <div className="flex h-screen flex-col bg-stone-700">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
