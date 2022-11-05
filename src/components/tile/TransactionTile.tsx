import { Button } from "@mui/material"
import { useState } from "react"
import { Dayjs } from "dayjs"
import { ConnectWallet } from "./ConnectWallet"
import { SelectCurrency } from "./SelectCurrency"
import { AmountAndTime } from "./AmountAndTime"

export const TransactionTile = () => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null)
  const [currencyAmount, setCurrencyAmount] = useState("")
  const [currency, setCurrency] = useState("")

  return (
    <div className="h-96 rounded-md  border border-stone-400 bg-stone-500">
      <ConnectWallet />
      <SelectCurrency currency={currency} setCurrency={setCurrency} />
      <AmountAndTime
        currencyAmount={currencyAmount}
        setCurrencyAmount={setCurrencyAmount}
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
      <div className="grid h-1/4 place-content-center">
        <Button onClick={() => {}} className="" variant="contained">
          Store your funds
        </Button>
      </div>
    </div>
  )
}
