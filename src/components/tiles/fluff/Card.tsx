import { motion } from "framer-motion"

interface Props {
  tall?: boolean
  wide?: boolean
  ultraWide?: boolean
  content: React.ReactNode
}

export const Card: React.FC<Props> = ({ tall, wide, content, ultraWide }) => {
  return (
    <motion.div
      layout
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          x: 0,
          transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.5,
            bounce: 0.2,
          },
        },
        hidden: {
          opacity: 0,
          x: -20,
          scale: 0.9,
          transition: { duration: 0.3 },
        },
      }}
      className={`${tall ? "card-tall" : ""} ${wide ? "card-wide" : ""} ${
        ultraWide ? "card-ultra-wide" : ""
      } transform rounded-md border border-slate-500 bg-slate-400 bg-opacity-20 p-2 text-slate-200`}
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      {content}
    </motion.div>
  )
}
