import { Header } from "./components/header/Header"
import { MainContent } from "./components/MainContent"

export const App: React.FC = () => {
  return (
    <div id="app" className="scrollbar flex h-screen flex-col overflow-auto">
      <Header />
      <MainContent />
    </div>
  )
}
