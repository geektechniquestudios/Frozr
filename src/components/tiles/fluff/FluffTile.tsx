import { motion } from "framer-motion"

interface Props {
  layoutTransition: {}
}

export const FluffTile: React.FC<Props> = ({layoutTransition}) => {
  return (
    <motion.div
      layout
      transition={layoutTransition}
      className="flex flex-col gap-3 rounded-md border border-slate-500 bg-slate-400 bg-opacity-20 p-2 text-slate-200"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex w-full justify-center">
        <div className="border p-2 sm:w-4/6">
          <div className="flex flex-col">
            <p className="border-b p-1 text-xl">Fully Decentralized</p>
            <p className="text-sm">
              A trustless system holds your funds. Your money is kept in a
              protocol running on the blockchain of your coin, not with an
              individual or business.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="border p-2  sm:w-1/3">
          <p className="m-2 border-b p-1 text-xl">Entierly Open Source</p>
          <p className="text-sm">
            You can feel confident that your funds are safe due to the
            transparent nature of the code.
          </p>
        </div>
        <div className="border p-2  sm:w-1/3">
          <p className="m-2 border-b p-1 text-xl">No Ads</p>
          <p className="text-sm">
            A trustless system holds your funds. Your money is kept in a
            protocol running on the blockchain of your coin, not with an
            individual or business.
          </p>
        </div>
        <div className="border p-2  sm:w-1/3">
          <p className="m-2 border-b p-1 text-xl">No Data Collection</p>
          <p className="text-sm">
            A trustless system holds your funds. Your money is kept in a
            protocol running on the blockchain of your coin, not with an
            individual or business.
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="border p-2 sm:w-4/6">
          <div className="flex flex-col">
            <p className="border-b p-1 text-xl">Fully Decentralized</p>
            <p className="text-sm">
              A trustless system holds your funds. Your money is kept in a
              protocol running on the blockchain of your coin, not with an
              individual or business.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
