import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { Form } from "../../containers/Form"
import { Wallet } from "../../containers/Wallet"

import { default as selectCurrencyLogo } from "/src/assets/undraw_currency.svg"

interface Props {}

export const SelectCurrency: React.FC<Props> = ({}) => {
  const { currencyBorderColor, setCurrencyBorderColor } = Form.useContainer()
  const { currency, setCurrency } = Wallet.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="p-3">
        <FormControl
          fullWidth
          onFocus={() => {
            setCurrencyBorderColor("border-transparent")
          }}
        >
          <InputLabel>Select Currency</InputLabel>
          <Select
            className={`${currencyBorderColor} w-48 border`}
            value={currency}
            label="Select Currency"
            onChange={(event: SelectChangeEvent) => {
              setCurrency(event.target.value)
            }}
          >
            <MenuItem value="Avax">Avax</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-slate-400">
        <img src={selectCurrencyLogo} alt="currency logo" className="h-16" />
      </div>
    </div>
  )
}
