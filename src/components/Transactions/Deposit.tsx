import { Button } from "@mui/material"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { BiTimeFive } from "react-icons/bi"
import { Wallet } from "../../containers/Wallet"
import { Transaction } from "./Deposits"

export const Deposit: React.FC<Transaction> = ({
  amount,
  startDate,
  releaseDate,
  isComplete,
  depositId,
}) => {
  const { callContract, currency } = Wallet.useContainer()

  const withdrawFunds = async () => {
    const overrides = {
      gasLimit: 1000000,
    }
    callContract(async (contract) => {
      await contract.withdraw(depositId, overrides)
    })
  }

  const releaseDateFormatted = dayjs(releaseDate.toNumber() * 1000).format(
    "MM/DD/YYYY",
  )

  const startDateFormatted = dayjs(startDate.toNumber() * 1000).format(
    "MM/DD/YYYY",
  )

  const balance = Number((Number(amount.toString()) / 10 ** 18).toFixed(6))

  const isReadyToWithdraw = dayjs().isAfter(releaseDateFormatted)
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -4 },
  }
  return (
    <motion.div
      className="flex h-14 justify-between gap-1 rounded-sm border border-slate-500 bg-slate-500 bg-opacity-50 text-stone-200"
      variants={item}
    >
      <div className="flex w-28 flex-col px-2 py-1">
        <p>{balance}</p>
        <p className="text-xs">{currency}</p>
      </div>
      <div className="grid place-content-center px-2 py-1 text-sm sm:text-base">
        {startDateFormatted} - {releaseDateFormatted}
      </div>
      <div className="grid place-content-center px-2 py-1">
        {!isComplete ? (
          <div className="flex items-center gap-2">
            <Button
              variant="contained"
              onClick={withdrawFunds}
              disabled={!isReadyToWithdraw}
            >
              Withraw
            </Button>
          </div>
        ) : (
          <BiTimeFive title="Withdraw not ready yet" />
        )}
      </div>
    </motion.div>
  )
}
