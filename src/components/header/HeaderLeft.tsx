import { motion } from "framer-motion"
import { default as logo } from "/src/assets/logo.png"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <motion.button
        onClick={() => {
          window.location.href = "/"
        }}
        className="flex h-full items-center justify-start gap-1.5 align-middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
        }}
      >
        <img src={logo} alt="logo" className="h-8" />
        <p className="mx-3 text-2xl font-extrabold ">Frozr</p>
      </motion.button>
    </div>
  )
}
