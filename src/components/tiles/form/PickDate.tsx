import { TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { Form } from "../../../containers/Form"
import { default as dateLogo } from "/src/assets/undraw_calendar.svg"

interface Props {
  date: Dayjs
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export const PickDate: React.FC<Props> = ({ date, setDate }) => {
  const { calendarBorderColor, setCalendarBorderColor } = Form.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        <div
          className={`rounded-md border ${calendarBorderColor}`}
          onClick={() => {
            setCalendarBorderColor("border-transparent")
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              minDate={dayjs().add(1, "day")}
              className={`${calendarBorderColor} w-48 border text-stone-300`}
              label="Pick date"
              value={date}
              onChange={(newValue) => {
                if (newValue) setDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-zinc-400 bg-opacity-80">
        <div />
        <div />
        <img src={dateLogo} alt="date logo" className="h-16" />
      </div>
    </div>
  )
}
