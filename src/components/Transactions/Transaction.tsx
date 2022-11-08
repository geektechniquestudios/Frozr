import dayjs from "dayjs"
import { Transaction } from "./Deposits"

export const Deposit: React.FC<Transaction> = ({
  amount,
  releaseDate,
  isComplete,
}) => {
  return (
    <div className="flex h-14 justify-between gap-2 border">
      <div className="grid place-content-center border px-2 py-1">
        {amount.toString()}
      </div>
      <div className="grid place-content-center border px-2 py-1">
        {dayjs(releaseDate.toString()).toString()}
      </div>
      <div className="grid place-content-center border px-2 py-1">
        {isComplete.toString()}
      </div>
    </div>
  )
}
