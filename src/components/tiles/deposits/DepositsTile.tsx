import { useEffect } from "react"
import { Form } from "../../../containers/Form"
import { Deposit } from "./Deposit"
import { Wallet } from "../../../containers/Wallet"
import { AnimatePresence, motion } from "framer-motion"
import { DepositsHeader } from "./DepositsHeader"

interface Props {
  layoutTransition: {}
}

export const DepositsTile: React.FC<Props> = ({ layoutTransition }) => {
  const { page, setPage } = Form.useContainer()
  const { deposits, refreshDeposits, isWalletConnected, isCorrectNetwork } =
    Wallet.useContainer()

  useEffect(() => {
    if (!isWalletConnected || isCorrectNetwork) return
    refreshDeposits()
  }, [isWalletConnected])

  const isNextDisabled =
    page === Math.ceil(deposits.length / 6) - 1 ||
    !isWalletConnected ||
    deposits.length === 0
  const isPrevDisabled =
    page === 0 || !isWalletConnected || deposits.length === 0

  return (
    <AnimatePresence>
      <motion.div
        layout
        transition={layoutTransition}
        className="shrink-0 overflow-hidden rounded-md border border-slate-500 bg-gray-500 bg-opacity-30 p-2"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        <DepositsHeader
          isNextDisabled={isNextDisabled}
          isPrevDisabled={isPrevDisabled}
          page={page}
          setPage={setPage}
          deposits={deposits}
        />

        <AnimatePresence>
          {isWalletConnected && deposits.length > 0 && (
            <motion.div
              layout="position"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    when: "beforeChildren",
                    type: "tween",
                  },
                },
                hidden: { opacity: 0 },
              }}
              className="flex flex-col gap-2"
            >
              {deposits &&
                [...deposits]
                  .reverse()
                  .slice(page * 6, page * 6 + 6)
                  .map((deposit) => (
                    <Deposit {...deposit} key={deposit.depositId} />
                  ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
