import { motion } from "framer-motion"
import { default as vault } from "/src/assets/headingTile.svg"

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
      className="flex shrink-0 flex-col items-center overflow-clip rounded-md border border-slate-500 bg-slate-400 bg-opacity-40 p-4 sm:flex-row"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex h-32 shrink justify-start sm:w-1/2">
        <img src={vault} alt="vault" className="drop-shadow-2xl" />
      </div>
      <p className="m-3 rounded-md border border-slate-500 border-opacity-50 bg-slate-700 bg-opacity-70 p-2 text-lg font-bold text-stone-50 sm:ml-14 sm:w-1/2 sm:text-2xl">
        Lock your cyptocurrency in a timed smart-contract vault for free
      </p>
      <div className="absolute -z-50 h-[35em] w-[35em] -translate-x-[16em] translate-y-8 rounded-full border border-slate-600 bg-slate-500 opacity-90 blur-2xl" />
    </motion.div>
  )
}
