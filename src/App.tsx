import * as React from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { MainContent } from "./components/MainContent"

export const App: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-sky-900">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}
