import { TextField } from "@mui/material"
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

interface Props {
  date: Dayjs | null
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const Date: React.FC<Props> = ({ date, setDate }) => {
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            className="text-stone-300 w-48"
            label="Choose the date"
            value={date}
            onChange={(newValue) => {
              if (newValue) setDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-indigo-300 bg-opacity-20">
        <div />
        <div />
        <img
          src="./src/assets/undraw_calendar.svg"
          alt="underdraw_eth.svg"
          className="h-16"
        />
      </div>
    </div>
  )
}
