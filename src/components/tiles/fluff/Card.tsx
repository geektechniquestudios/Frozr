import { motion } from "framer-motion"

interface Props {
  title: string
  description1: string | React.ReactNode
  description2?: string | React.ReactNode
  icon: React.ReactNode
}

export const Card: React.FC<Props> = ({
  title,
  description1,
  description2,
  icon,
}) => {
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
      className="h-96 overflow-clip rounded-lg border border-slate-500"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="h-full w-full rounded-lg border-4 border-slate-700 bg-slate-700">
        <div className="flex h-full flex-col">
          <div
            className="z-50 flex h-20 items-center justify-center rounded-t-md bg-slate-800  bg-opacity-80 p-1 text-center text-lg font-bold text-slate-200"
            style={{ backdropFilter: "blur(16px)" }}
          >
            <div className="grid h-20 w-20 translate-y-10 place-content-center rounded-full border-4 border-slate-700 bg-slate-800">
              {icon}
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center font-bold text-slate-300">
            <div className="z-50 mt-10 p-2 text-center text-slate-400">
              {title}
            </div>
            <div className="z-50 h-full w-full p-5">
              <div className="flex h-full flex-col gap-4">
                <div className={`${!description2 && "h-full"}`}>
                  {description1}
                </div>
                <div className="text-slate-100">{description2}</div>
              </div>
            </div>
            <div className="absolute h-[35em] w-[35em] translate-x-48 translate-y-40 rounded-full bg-slate-600 opacity-50 blur-2xl" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
