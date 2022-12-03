import { TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { AnimatePresence, motion } from "framer-motion"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"
import { default as dateLogo } from "/src/assets/pickDate.svg"

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
                  setBarLengths([40, 25, 10, 1])
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
        className="flex w-full items-center justify-center overflow-clip rounded-l-xl border-l border-t border-b border-violet-200 border-opacity-20 bg-indigo-200 bg-opacity-60"
      >
        <img
          src={dateLogo}
          alt="date logo"
          className="h-36 translate-y-3 drop-shadow-2xl"
        />
        <AnimatePresence>
          {!isSmall && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.1,
                type: "spring",
                damping: 20,
                bounce: 0.7,
              }}
              className="absolute -z-50 h-48 w-48 border border-slate-500 border-opacity-30 bg-sky-300 bg-opacity-20"
              style={{ borderRadius: "77% 23% 17% 83% / 61% 38% 62% 39%" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
