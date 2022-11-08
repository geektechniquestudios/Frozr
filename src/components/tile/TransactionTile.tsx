import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { ConnectWallet } from "./ConnectWallet"
import { SelectCurrency } from "./SelectCurrency"
import { Amount } from "./Amount"
import { SendFunds } from "./SendFunds"
import { Date } from "./Date"

export const TransactionTile = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().add(1, "day"))
  const [amount, setAmount] = useState("")

  return (
    <div
      className="h-[32em] shrink-0 rounded-md  border border-stone-600 bg-slate-500 bg-opacity-40"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <ConnectWallet />
      <SelectCurrency />
      <Date date={date} setDate={setDate} />
      <Amount amount={amount} setAmount={setAmount} />
      <SendFunds amount={amount} date={date} />
    </div>
  )
}
