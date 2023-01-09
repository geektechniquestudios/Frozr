import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { ConnectWallet } from "./ConnectWallet"
import { SelectCurrency } from "./SelectCurrency"
import { ChooseAmount } from "./ChooseAmount"
import { StoreFunds } from "./StoreFunds"
import { PickDate } from "./PickDate"
import { motion } from "framer-motion"

export const FormTile = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().add(1, "day"))
  const [amount, setAmount] = useState("")

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
      }}
      className="h-[32em] shrink-0 overflow-hidden rounded-md border border-slate-500 bg-slate-500 bg-opacity-40"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <ConnectWallet />
      <SelectCurrency />
      <PickDate date={date} setDate={setDate} />
      <ChooseAmount amount={amount} setAmount={setAmount} />
      <StoreFunds amount={amount} date={date} />
    </motion.div>
  )
}
