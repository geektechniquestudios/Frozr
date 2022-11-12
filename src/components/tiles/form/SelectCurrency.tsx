import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { Form } from "../../../containers/Form"
import { CurrencyString, Wallet } from "../../../containers/Wallet"

import { default as selectCurrencyLogo } from "/src/assets/undraw_currency.svg"

interface Props {}

export const SelectCurrency: React.FC<Props> = ({}) => {
  const { currencyBorderColor, setCurrencyBorderColor } = Form.useContainer()
  const { currency, setCurrency, isCorrectNetwork, updateNetwork } =
    Wallet.useContainer()

  const label = isCorrectNetwork
    ? "Select a Currency"
    : "Change Your Wallet's Network"
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="p-3">
        <FormControl
          fullWidth
          onFocus={() => {
            setCurrencyBorderColor("border-transparent")
          }}
        >
          <InputLabel>
            <div className={`${isCorrectNetwork ? "" : "text-yellow-500"}`}>
              {label}
            </div>
          </InputLabel>
          <Select
            className={`${currencyBorderColor} w-48 border`}
            value={currency}
            label={label}
            onChange={(event: SelectChangeEvent) => {
              setCurrency(event.target.value as CurrencyString)
            }}
          >
            <MenuItem
              value="AVAX"
              onClick={() => {
                updateNetwork("AVAX")
              }}
            >
              AVAX
            </MenuItem>
            <MenuItem
              value="BNB"
              onClick={() => {
                updateNetwork("BNB")
              }}
            >
              BNB
            </MenuItem>
            <MenuItem
              disabled
              value="NEON"
              onClick={() => {
                updateNetwork("NEON")
              }}
            >
              NEON
            </MenuItem>
            <MenuItem
              disabled
              value="ETH"
              onClick={() => {
                updateNetwork("ETH")
              }}
            >
              ETHER
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-slate-400">
        <img src={selectCurrencyLogo} alt="currency logo" className="h-16" />
      </div>
    </div>
  )
}
