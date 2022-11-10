import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { ConnectWallet } from "./ConnectWallet"
import { SelectCurrency } from "./SelectCurrency"
import { ChooseAmount } from "./ChooseAmount"
import { StoreFunds } from "./StoreFunds"
import { PickDate } from "./PickDate"

export const FormTile = () => {
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
      <PickDate date={date} setDate={setDate} />
      <ChooseAmount amount={amount} setAmount={setAmount} />
      <StoreFunds amount={amount} date={date} />
    </div>
  )
}
