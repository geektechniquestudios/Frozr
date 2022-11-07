import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { Form } from "../../containers/Form"

interface Props {
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
}

export const SelectCurrency: React.FC<Props> = ({ currency, setCurrency }) => {
  const { currencyBorderColor, setCurrencyBorderColor } = Form.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="p-3">
        <FormControl fullWidth>
          <InputLabel>Select Currency</InputLabel>
          <Select
            onClick={() => {
              setCurrencyBorderColor("border-transparent")
            }}
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
        <img
          src="./src/assets/undraw_currency.svg"
          alt="undraw_currency.svg"
          className="h-16"
        />
      </div>
    </div>
  )
}
