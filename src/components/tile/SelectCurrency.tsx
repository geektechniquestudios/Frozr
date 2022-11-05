import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"

interface Props {
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
}

export const SelectCurrency: React.FC<Props> = ({ currency, setCurrency }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string)
  }

  return (
    <div className="flex h-1/4 justify-evenly gap-4 py-1">
      <div className="p-3">
        <FormControl fullWidth>
          <InputLabel>Select Currency</InputLabel>
          <Select
            className="w-48"
            value={currency}
            label="Select Currency"
            onChange={handleChange}
          >
            <MenuItem value="10">Avax</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-slate-400">
        <div />
        <img
          src="./src/assets/undraw_eth.svg"
          alt="underdraw_eth.svg"
          className="h-16"
        />
      </div>
    </div>
  )
}
