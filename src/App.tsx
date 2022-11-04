import { Header } from "./components/header/Header"
import { MainContent } from "./components/MainContent"

export const App: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-stone-700">
      <Header />
      <MainContent />
    </div>
  )
}
