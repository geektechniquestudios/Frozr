import { Button } from "@mui/material"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { Deposit as DepositInterface, Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"

export const Deposit: React.FC<DepositInterface> = ({
  amount,
  startDate,
  releaseDate,
  isComplete,
  depositId,
}) => {
  const { callContract, currency, blockTimestamp, refreshDeposits } =
    Wallet.useContainer()

  const { width } = WindowSize.useContainer()

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
      <div className="flex w-auto shrink flex-col justify-center sm:w-28">
        <p className="text-sm sm:text-base">{balance}</p>
        <p className="text-xs">{currency}</p>
      </div>
      <div className="mx-0.5 grid place-content-center text-xs sm:text-base">
        <div>{startDateFormatted} -</div>
        <div>{releaseDateFormatted}</div>
      </div>
      <div className="grid place-content-center">
        <Button
          className="w-20 text-slate-800 sm:w-28"
          variant="contained"
          onClick={withdrawFunds}
          disabled={!isReadyToWithdraw || isComplete}
          sx={{ fontSize: width < 640 ? 10 : 14 }}
        >
          {isComplete ? "Complete" : isReadyToWithdraw ? "Withdraw" : "Locked"}
        </Button>
      </div>
    </motion.div>
  )
}
