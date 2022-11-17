import { motion } from "framer-motion"
import { Header } from "./components/header/Header"
import { MainContent } from "./components/MainContent"

export const App: React.FC = () => {
  return (
    <motion.div
      id="app"
      layoutScroll
      className="scrollbar flex h-screen flex-col overflow-y-scroll"
    >
      <Header />
      <MainContent />
    </motion.div>
  )
}
