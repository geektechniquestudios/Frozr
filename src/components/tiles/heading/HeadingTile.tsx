import { motion } from "framer-motion"
import { default as vault } from "/src/assets/undraw_vault.svg"

export const HeadingTile = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scaleX: 0.95, x: -25, y: -5 }}
      animate={{ opacity: 1, scaleX: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.04,
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.5,
        bounce: 0.2,
      }}
      className="flex flex-col items-center rounded-md border border-slate-500 bg-slate-400 bg-opacity-40 p-4 sm:flex-row "
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex h-32 shrink justify-start text-stone-300 sm:w-1/2">
        <img src={vault} alt="vault" />
      </div>
      <p className="m-3 border-l border-slate-400 pl-2 text-2xl font-bold text-stone-200 sm:w-1/2">
        Lock your cyptocurrency in a timed smart-contract vault for free
      </p>
    </motion.div>
  )
}
