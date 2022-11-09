import { useState } from "react"
import { createContainer } from "unstated-next"

const useForm = () => {
  const [connectBorderColor, setConnectBorderColor] =
    useState("border-transparent")
  const [currencyBorderColor, setCurrencyBorderColor] =
    useState("border-transparent")
  const [calendarBorderColor, setCalendarBorderColor] =
    useState("border-transparent")
  const [amountBorderColor, setAmountBorderColor] = useState("border-blue-300")
  const [deposits, setDeposits] = useState(true)
  const refreshDeposits = () => {
    setDeposits(!deposits)
  }
  const [page, setPage] = useState(0)

  return {
    connectBorderColor,
    setConnectBorderColor,
    currencyBorderColor,
    setCurrencyBorderColor,
    calendarBorderColor,
    setCalendarBorderColor,
    amountBorderColor,
    setAmountBorderColor,
    refreshDeposits,
    deposits,
    page,
    setPage,
  }
}

export const Form = createContainer(useForm)
