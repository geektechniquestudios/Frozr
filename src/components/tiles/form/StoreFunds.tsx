import { Button } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { ethers } from "ethers"
import Swal from "sweetalert2"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import withReactContent from "sweetalert2-react-content"
import { TOS } from "../../popups/TOS"

interface Props {
  amount: string
  date: Dayjs
}

const MySwal = withReactContent(Swal)

export const StoreFunds: React.FC<Props> = ({ amount, date }) => {
  const {
    setConnectBorderColor,
    setCurrencyBorderColor,
    setCalendarBorderColor,
    setAmountBorderColor,
    setPage,
  } = Form.useContainer()

  const {
    isWalletConnected,
    callContract,
    currency,
    refreshDeposits,
    isCorrectNetwork,
  } = Wallet.useContainer()

  const sendDeposit = async (): Promise<void> => {
    const doesUserAccept = async (daysToFreeze: number): Promise<boolean> => {
      const isConfirmed = await MySwal.fire({
        title: (
          <div>
            <div className="text-2..eeee.xl">
              {`Are you sure you want to store ${amount} ${currency} for ${daysToFreeze} ${
                daysToFreeze === 1 ? "day" : "days"
              }?`}
            </div>
            <div className="text-xs">
              By using this service, you agree to our{" "}
              <button
                onClick={() => {
                  MySwal.fire({
                    html: <TOS />,
                    confirmButtonText: "Close",
                    confirmButtonColor: "#0369a1",
                  })
                }}
                className="underline"
              >
                Terms of Service
              </button>
              .
            </div>
          </div>
        ),

        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Send",
        confirmButtonColor: "#0369a1",
      }).then((res) => res.isConfirmed)
      return isConfirmed
    }

    const areFieldsFilled = () => {
      const reddenWalletButton = () => {
        setConnectBorderColor("red")
        return false
      }
      const reddenCurrencyButton = () => {
        setCurrencyBorderColor("")
        setCurrencyBorderColor("border-red-600")
        return false
      }
      const reddenCalendarButton = () => {
        setConnectBorderColor("")
        setCurrencyBorderColor("border-transparent")
        setCalendarBorderColor("border-red-600")
        return false
      }
      const reddenAmountButton = () => {
        setConnectBorderColor("")
        setCurrencyBorderColor("border-transparent")
        setCalendarBorderColor("border-transparent")
        setAmountBorderColor("border-red-600")
        return false
      }
      if (!isWalletConnected) return reddenWalletButton()
      else if (!currency || !isCorrectNetwork) return reddenCurrencyButton()
      else if (!date || dayjs(date) < dayjs()) return reddenCalendarButton()
      else if (!amount || Number(amount) <= 0) return reddenAmountButton()
      return true
    }

    const depositFunds = async (contract: ethers.Contract) => {
      const date1 = dayjs()
      const date2 = dayjs(date)
      const diff = date2.diff(date1, "day", true)
      const daysToFreeze = Math.floor(diff) + 1

      if (!(await doesUserAccept(daysToFreeze))) return

      const bigAmount = ethers.utils.parseEther(amount)

      const overrides = {
        value: bigAmount,
        // gasLimit: 10000000,
      }

      return await contract.deposit(daysToFreeze, overrides)
    }

    if (!areFieldsFilled()) return
    callContract(depositFunds, () => {
      refreshDeposits()
      setPage(0)
    })
  }

  return (
    <div className="grid h-1/5 place-content-center">
      <Button
        onClick={sendDeposit}
        className="h-14 w-48"
        variant="outlined"
        sx={{ fontWeight: "bold" }}
      >
        Store your funds
      </Button>
    </div>
  )
}
