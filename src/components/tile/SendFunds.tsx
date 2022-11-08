import { Button } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { ethers } from "ethers"
import Swal from "sweetalert2"
import { Auth } from "../../containers/Auth"
import { Form } from "../../containers/Form"
import { Wallet } from "../../containers/Wallet"

interface Props {
  amount: string
  date: Dayjs
}

export const SendFunds: React.FC<Props> = ({ amount, date }) => {
  const {
    setConnectBorderColor,
    setCurrencyBorderColor,
    setCalendarBorderColor,
    setAmountBorderColor,
    refreshDeposits,
  } = Form.useContainer()

  const { callContract, currency } = Wallet.useContainer()
  const { isWalletConnected } = Auth.useContainer()

  const sendDeposit = async (): Promise<void> => {
    const doesUserAccept = async (daysToFreeze: number): Promise<boolean> => {
      console.log(amount)
      const isConfirmed = await Swal.fire({
        title: `Are you sure you want to store ${amount} ${currency} for ${daysToFreeze} ${
          daysToFreeze === 1 ? "day" : "days"
        }?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Send",
        confirmButtonColor: "#93c5fd",
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
      else if (!currency) return reddenCurrencyButton()
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
        gasLimit: 1000000,
      }

      return await contract.deposit(daysToFreeze, overrides)
    }

    if (!areFieldsFilled()) return
    callContract(depositFunds, refreshDeposits)
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
