import { motion } from "framer-motion"
import { Card } from "./Card"
import "./photo-grid.scss"

interface Props {
  layoutTransition: {}
}

export const FluffTile: React.FC<Props> = ({ layoutTransition }) => {
  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.09,
            when: "beforeChildren",
            type: "tween",
          },
        },
      }}
      transition={layoutTransition}
      className="photo-grid grid gap-3 rounded-md text-slate-200"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <Card
        tall
        content={
          <div className="flex flex-col gap-2 p-2">
            <p className="m-2 border-b p-1 text-xl font-bold">
              Fully Decentralized
            </p>
            <p className="leading-8">
              A trustless smart-contract holds your funds. Your investment is
              kept safe in a protocol running on the blockchain, not with an
              individual, business, or bank.
            </p>
          </div>
        }
      />
      <Card
        content={
          <div className="">
            <p className="m-2 border-b p-1 text-xl font-bold">
              Entierly Open Source
            </p>
            <p className="leading-8">
              You can feel confident that your funds are safe due to the
              transparent nature of the code.
            </p>
          </div>
        }
      />
      <Card
        content={
          <div className="">
            <p className="m-2 border-b p-1 text-xl font-bold">
              No Data Collection
            </p>
            <p className="text-sm">
              A trustless system holds your funds. Your money is kept in a
              protocol running on the blockchain of your coin, not with an
              individual or business.
            </p>
          </div>
        }
      />
      <Card
        wide
        content={
          <div>
            <p className="border-b p-1 text-xl font-bold">Actually Free</p>
            <p className="text-sm">
              A trustless system holds your funds. Your money is kept in a
              protocol running on the blockchain of your coin, not with an
              individual or business.
            </p>
          </div>
        }
      />
      <Card
        wide
        tall
        content={
          <div>
            <p className="border-b p-1 text-xl font-bold">Actually Free</p>
            <p className="text-sm">
              A trustless system holds your funds. Your money is kept in a
              protocol running on the blockchain of your coin, not with an
              individual or business.
            </p>
          </div>
        }
      />
      <Card
        tall
        content={
          <div className="">
            <p className="m-2 border-b p-1 text-xl">See Our Smart Contracts</p>
            <p className="text-sm">
              This will be a bulleted list of links to the smart contracts
            </p>
          </div>
        }
      />
      <Card
        ultraWide
        content={
          <div className="">
            <p className="m-2 border-b p-1 text-xl font-bold">
              Entierly Open Source
            </p>
            <p className="text-sm">
              You can feel confident that your funds are safe due to the
              transparent nature of the code.
            </p>
          </div>
        }
      />
    </motion.div>
  )
}
