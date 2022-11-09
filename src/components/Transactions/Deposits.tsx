import { useEffect, useState } from "react"
import { Auth } from "../../containers/Auth"
import { Form } from "../../containers/Form"
import { Deposit } from "./Deposit"
import { Wallet } from "../../containers/Wallet"
import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const { isWalletConnected } = Auth.useContainer()
  const { page, setPage } = Form.useContainer()
  const { transactions, refreshDeposits } = Wallet.useContainer()

  useEffect(() => {
    if (!isWalletConnected) return
    refreshDeposits()
  }, [isWalletConnected])

  const list = {
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.06 },
    },
    hidden: { opacity: 0 },
  }

  const isNextDisabled = page === Math.ceil(transactions.length / 6) - 1
  const isPrevDisabled = page === 0

  return (
    <div
      className="scrollbar shrink-0 overflow-auto rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-2"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      {/* say something about how you will only see transactions from the network your wallet is on */}
      <div className="flex w-full justify-between gap-2 px-2">
        <button
          title={!(isPrevDisabled || !isWalletConnected) ? "Previous" : ""}
          onClick={() => setPage(page - 1)}
          disabled={isPrevDisabled || !isWalletConnected}
          className="grid place-content-center"
        >
          <MdOutlineNavigateBefore
            size={29}
            className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
              isPrevDisabled || !isWalletConnected
                ? "text-slate-500"
                : "text-slate-200 hover:border-slate-300"
            }`}
          />
        </button>
        <p className="grid h-14 w-full place-content-center text-center text-xl font-extrabold text-stone-300 sm:text-2xl">
          {transactions.length == 0 || !isWalletConnected
            ? "No Deposits To Show"
            : "Your Deposits"}
        </p>
        <button
          title={!(isNextDisabled || !isWalletConnected) ? "Next" : ""}
          onClick={() => setPage(page + 1)}
          disabled={isNextDisabled || !isWalletConnected}
          className="grid place-content-center"
        >
          <MdOutlineNavigateNext
            size={29}
            className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
              isNextDisabled || !isWalletConnected
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
                .map((transaction) => (
                  <Deposit {...transaction} key={transaction.depositId} />
                ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
