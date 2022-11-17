import { AnimatePresence, motion } from "framer-motion"

interface Props {
  // ultraWide?: boolean
  title: string
  description: string | React.ReactNode
  icon: React.ReactNode
  // selectedIndex?: number
  // setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  // cardIndex: number
}

export const Card: React.FC<Props> = ({
  title,
  description,
  icon,
  // selectedIndex,
  // setSelectedIndex,
  // cardIndex,
}) => {
  // const isSelectedStyle = selectedIndex === cardIndex ? " card-wide" : ""
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
      className={`h-96 rounded-md border border-slate-500 bg-slate-400 bg-opacity-20`}
      style={{
        backdropFilter: "blur(16px)",
      }}
      // onClick={() => {
      //   setSelectedIndex(cardIndex === selectedIndex ? -1 : cardIndex)
      // }}
    >
      <div className="flex h-full flex-col">
        <div
          className={`flex h-20 items-center justify-center border-b border-slate-600 bg-slate-800 bg-opacity-20 p-1 text-center text-lg font-bold text-slate-200`}
          style={{ backdropFilter: "blur(16px)" }}
        >
          <div className="grid h-20 w-20 translate-y-10 place-content-center rounded-full border-transparent border-slate-400 border-opacity-20 bg-slate-800">
            {icon}
          </div>
        </div>
        <div
          className={`flex h-full flex-col items-center justify-center font-bold leading-loose text-slate-300 sm:leading-10`}
        >
          <div className="mt-8 p-2 text-center text-slate-300">{title}</div>
          <div className="h-full w-full p-2"></div>
          {/* {description} */}
        </div>
      </div>
    </motion.div>
  )
}
