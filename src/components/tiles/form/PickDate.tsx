import { TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { motion } from "framer-motion"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"
import { default as dateLogo } from "/src/assets/undraw_calendar.svg"

interface Props {
  date: Dayjs
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export const PickDate: React.FC<Props> = ({ date, setDate }) => {
  const { calendarBorderColor, setCalendarBorderColor } = Form.useContainer()
  const { isWalletConnected, barLengths, setBarLengths } = Wallet.useContainer()
  const { isSmall } = WindowSize.useContainer()

  const xPos = isSmall ? 0 : barLengths[2]
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
              disabled={!isWalletConnected}
              minDate={dayjs().add(1, "day")}
              className={`${calendarBorderColor} w-48 border text-stone-300`}
              label="Pick Your Date"
              value={date}
              onChange={(newValue) => {
                if (newValue) {
                  setDate(newValue)
                  setBarLengths([40, 25, 10, 0])
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <motion.div
        initial={{
          x: 400,
        }}
        animate={{
          x: xPos,
        }}
        transition={{
          delay: 0.1,
          duration: 5,
          type: "spring",
          damping: 20,
          bounce: 0.7,
        }}
        className="flex w-full items-center justify-center rounded-l-xl border-l border-t border-b border-stone-600 bg-zinc-400 bg-opacity-80"
      >
        <img src={dateLogo} alt="date logo" className="h-16" />
      </motion.div>
    </div>
  )
}
