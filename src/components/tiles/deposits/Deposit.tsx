import { Button } from "@mui/material"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { Deposit as DepositInterface, Wallet } from "../../../containers/Wallet"

export const Deposit: React.FC<DepositInterface> = ({
  amount,
  startDate,
  releaseDate,
  isComplete,
  depositId,
}) => {
  const { callContract, currency, blockTimestamp, refreshDeposits } =
    Wallet.useContainer()

  const withdrawFunds = async () => {
    callContract(async (contract) => {
      return await contract.withdraw(depositId)
    }, refreshDeposits)
  }

  const releaseDateFormatted = dayjs(releaseDate * 1000).format("MM/DD/YYYY")
  const startDateFormatted = dayjs(startDate * 1000).format("MM/DD/YYYY")

  const balance =
    Number((Number(amount.toString()) / 10 ** 18).toFixed(6)) === 0
      ? "<0.000001"
      : Number((Number(amount.toString()) / 10 ** 18).toFixed(6))

  const isReadyToWithdraw = (blockTimestamp ?? 0) >= releaseDate

  return (
    <motion.div
      className="flex h-14 justify-between gap-1 rounded-sm border border-slate-500 bg-slate-500 bg-opacity-50 px-2 text-stone-200"
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -4 },
      }}
    >
      <div className="flex w-28 flex-col justify-center">
        <p>{balance}</p>
        <p className="text-xs">{currency}</p>
      </div>
      <div className="grid place-content-center text-sm sm:text-base">
        {startDateFormatted} - {releaseDateFormatted}
      </div>
      <div className="grid place-content-center">
        <Button
          className="w-28 text-slate-800"
          variant="contained"
          onClick={withdrawFunds}
          disabled={!isReadyToWithdraw || isComplete}
        >
          {isComplete ? "Complete" : isReadyToWithdraw ? "Withdraw" : "Locked"}
        </Button>
      </div>
    </motion.div>
  )
}
