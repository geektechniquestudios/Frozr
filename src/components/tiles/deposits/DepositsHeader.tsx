import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"
import { Deposit, Wallet } from "../../../containers/Wallet"

interface Props {
  isNextDisabled: boolean
  isPrevDisabled: boolean
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  deposits: Deposit[]
}

export const DepositsHeader: React.FC<Props> = ({
  isNextDisabled,
  isPrevDisabled,
  page,
  setPage,
  deposits,
}) => {
  const { currency, isWalletConnected } = Wallet.useContainer()
  return (
    <motion.div layout="position" className="flex w-full justify-between gap-2 px-2">
      <button
        title={!isPrevDisabled ? "Previous" : ""}
        onClick={() => setPage(page - 1)}
        disabled={isPrevDisabled}
        className="grid place-content-center"
      >
        <MdOutlineNavigateBefore
          size={29}
          className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
            isPrevDisabled
              ? "text-slate-500"
              : "text-slate-200 hover:border-slate-300"
          }`}
        />
      </button>
      <div className="grid h-14 w-full place-content-center text-center text-xl font-extrabold text-stone-300 sm:text-2xl">
        <AnimatePresence>
          {deposits.length == 0 || !isWalletConnected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1], translateY: 0 }}
              exit={{ opacity: 0, translateY: -30 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 40,
              }}
            >
              No Deposits To Show
            </motion.div>
          ) : (
            <motion.div
              className=" "
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: [0, 0, 1], translateY: 0 }}
              exit={{ opacity: 0, translateY: -30 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 40,
              }}
            >{`Your ${currency} Deposits`}</motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        title={!isNextDisabled ? "Next" : ""}
        onClick={() => setPage(page + 1)}
        disabled={isNextDisabled}
        className="grid place-content-center"
      >
        <MdOutlineNavigateNext
          size={29}
          className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
            isNextDisabled
              ? "text-slate-500"
              : "text-slate-200 hover:border-slate-300"
          }`}
        />
      </button>
    </motion.div>
  )
}
