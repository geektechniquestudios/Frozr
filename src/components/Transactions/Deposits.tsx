import { useEffect, useState } from "react"
import { Auth } from "../../containers/Auth"
import { BigNumber } from "ethers"
import { Form } from "../../containers/Form"
import { Deposit } from "./Deposit"
import { Wallet } from "../../containers/Wallet"
import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"

export interface Transaction {
  depositId: string
  amount: BigNumber
  startDate: BigNumber
  releaseDate: BigNumber
  currency: string
  isComplete: boolean
}

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { isWalletConnected } = Auth.useContainer()
  const { deposits, page, setPage } = Form.useContainer()
  const { callContract } = Wallet.useContainer()

  useEffect(() => {
    if (!isWalletConnected) return
    callContract(async (contract) => {
      setTransactions(await contract.viewDeposits())
    })
  }, [deposits, isWalletConnected])

  const list = {
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.06 },
    },
    hidden: { opacity: 0 },
  }

  const isNextEnabled = page === Math.ceil(transactions.length / 5) - 1
  const isPrevEnabled = page === 0

  return (
    <div
      className="scrollbar shrink-0 overflow-auto rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-2"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      {/* say something about how you will only see transactions from the network your wallet is on */}
      <div className="flex w-full  justify-between px-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={isPrevEnabled || !isWalletConnected}
          className="grid place-content-center"
        >
          <MdOutlineNavigateBefore
            size={29}
            className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
              isPrevEnabled || !isWalletConnected
                ? "text-slate-500"
                : "text-slate-200 hover:border-slate-300"
            }`}
          />
        </button>
        <p className="grid h-14 w-full place-content-center text-2xl font-extrabold text-stone-300">
          {transactions.length == 0 || !isWalletConnected
            ? "No Deposits Yet"
            : "Your Deposits"}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={isNextEnabled || !isWalletConnected}
          className="grid place-content-center"
        >
          <MdOutlineNavigateNext
            size={29}
            className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
              isNextEnabled || !isWalletConnected
                ? "text-slate-500"
                : "text-slate-200 hover:border-slate-300"
            }`}
          />
        </button>
      </div>
      <AnimatePresence>
        {isWalletConnected && transactions.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={list}
            className="flex flex-col gap-2"
          >
            {transactions &&
              [...transactions]
                .reverse()
                .slice(page * 6, page * 6 + 6)
                .map((transaction: Transaction) => (
                  <Deposit {...transaction} key={transaction.depositId} />
                ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
