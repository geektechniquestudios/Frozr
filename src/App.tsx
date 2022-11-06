import { Header } from "./components/header/Header"
import { MainContent } from "./components/MainContent"

export const App: React.FC = () => {
  return (
    <div id="app" className="flex h-screen flex-col scrollbar overflow-auto">
      <Header />
      <MainContent />
    </div>
  )
}
