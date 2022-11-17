import { AnimatePresence, motion } from "framer-motion"

interface Props {
  ultraWide?: boolean
  title: string
  description: string | React.ReactNode
  selectedIndex?: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  cardIndex: number
}

export const Card: React.FC<Props> = ({
  title,
  description,
  selectedIndex,
  setSelectedIndex,
  cardIndex,
}) => {
  const isSelectedStyle = selectedIndex === cardIndex ? " card-wide" : ""
  // const ultraWideStyle = ultraWide ? "card-ultra-wide" : ""
  // const smallTitleStyle =
  //   !tall && !wide && !ultraWide ? "sm:text-2xl" : "sm:text-3xl"
  // const smallDescriptionStyle =
  //   !tall && !wide && !ultraWide ? "sm:text-lg" : "sm:text-xl"
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
      className={`${isSelectedStyle} transform rounded-md border border-slate-500 bg-slate-400 bg-opacity-20 p-2`}
      style={{
        backdropFilter: "blur(16px)",
      }}
      onClick={() => {
        setSelectedIndex(cardIndex === selectedIndex ? -1 : cardIndex)
      }}
    >
      <div className="flex h-full flex-col gap-2 p-2">
        <AnimatePresence>
          {selectedIndex !== cardIndex && (
            <motion.div
              className={`flex items-center justify-center border-b p-1 text-center text-lg font-bold text-slate-200 sm:h-20`}
            >
              {title}
            </motion.div>
          )}
          {selectedIndex === cardIndex && (
            <motion.div
              className={`flex h-full flex-col items-center justify-center font-bold leading-loose text-slate-300 sm:leading-10`}
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
