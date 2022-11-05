import { TextField } from "@mui/material"
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import CurrencyInput from "react-currency-input-field"

interface Props {
  currencyAmount: string
  setCurrencyAmount: React.Dispatch<React.SetStateAction<string>>
  dateValue: Dayjs | null
  setDateValue: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const AmountAndTime: React.FC<Props> = ({
  currencyAmount,
  setCurrencyAmount,
  dateValue,
  setDateValue,
}) => {
  return (
    <div className="flex h-1/4 justify-evenly gap-4 p-3">
      <div className="grid place-content-center">
        <CurrencyInput
          className="rounded-md border border-stone-600 p-1"
          autoComplete="off"
          placeholder="Choose your amount"
          defaultValue=""
          decimalsLimit={18}
          value={currencyAmount}
          onValueChange={(value) => {
            setCurrencyAmount(Number(value!) === 0 ? "" : value!)
          }}
          allowNegativeValue={false}
          onBlur={(e) => {
            const newValue = Number(e.target.value.replace(/,/g, "") ?? 0)
            setCurrencyAmount(String(newValue))
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && e.currentTarget.blur()
          }}
        />
      </div>
      <div className="grid place-content-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            className="text-stone-300"
            label="Choose the date"
            value={dateValue}
            onChange={(newValue) => {
              if (newValue) setDateValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}
