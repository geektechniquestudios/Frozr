import { CircularProgress } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Transaction } from "./Transaction"

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // if wallet is connected, load transactions from the blockchain
  // use effect "iswalletconnected" to load transactions
  // if loading, show spinner
  // if no transactions, show "no transactions"

  useEffect(() => {
    // load transactions from blockchain
    // set transactions
    // set loading to false
  }, [])

  return (
    <AnimatePresence>
      <div
        className="h-[32em] shrink-0 grow rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-4"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        <p className="grid h-14 w-full place-content-center border-b border-slate-400 text-2xl font-extrabold text-stone-300">
          Your Deposits
        </p>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: [0, 0, 1], translateY: 0 }}
              exit={{ opacity: 0, translateY: 30 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 40,
              }}
              className="flex w-full justify-center"
            >
              <CircularProgress variant="indeterminate" className="m-6" />
            </motion.div>
          ) : transactions.length > 0 ? (
            transactions.map((transaction: any) => (
              <Transaction {...transaction} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: [0, 0, 1], translateY: 0 }}
              exit={{ opacity: 0, translateY: 30 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 40,
              }}
              className="m-4 grid place-content-center rounded-lg border bg-slate-600 p-2 text-2xl font-bold text-stone-300"
            >
              No deposits yet
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  )
}
