import { useState } from "react"
import { Dayjs } from "dayjs"
import { ConnectWallet } from "./ConnectWallet"
import { SelectCurrency } from "./SelectCurrency"
import { Amount } from "./Amount"
import { SendFunds } from "./SendFunds"
import { Date } from "./Date"

export const TransactionTile = () => {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("")

  return (
    <div
      className="h-[32em] shrink-0 rounded-md  border border-stone-600 bg-slate-500 bg-opacity-40"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <ConnectWallet />
      <SelectCurrency currency={currency} setCurrency={setCurrency} />
      <Date date={date} setDate={setDate} />
      <Amount amount={amount} setAmount={setAmount} />
      <SendFunds amount={amount} date={date} currency={currency} />
    </div>
  )
}
