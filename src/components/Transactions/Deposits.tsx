import { useEffect } from "react"
import { Form } from "../../containers/Form"
import { Deposit } from "./Deposit"
import { Wallet } from "../../containers/Wallet"
import { AnimatePresence, motion } from "framer-motion"
import { DepositsHeader } from "./DepositsHeader"

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const { page, setPage } = Form.useContainer()
  const { transactions, refreshDeposits, isWalletConnected } =
    Wallet.useContainer()

  useEffect(() => {
    if (!isWalletConnected) return
    refreshDeposits()
  }, [isWalletConnected])

  const isNextDisabled =
    page === Math.ceil(transactions.length / 6) - 1 || !isWalletConnected
  const isPrevDisabled = page === 0 || !isWalletConnected

  return (
    <motion.div
      layout
      className="scrollbar shrink-0 overflow-auto rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-2"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <DepositsHeader
        isNextDisabled={isNextDisabled}
        isPrevDisabled={isPrevDisabled}
        page={page}
        setPage={setPage}
        transactions={transactions}
      />
      <AnimatePresence>
        {isWalletConnected && transactions.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                opacity: 1,
                transition: { when: "beforeChildren", staggerChildren: 0.06 },
              },
              hidden: { opacity: 0 },
            }}
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
    </motion.div>
  )
}
