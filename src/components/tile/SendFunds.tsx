import { Button } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { ethers } from "ethers"
import Frozr from "../../artifacts/contracts/Frozr.sol/Frozr.json"
import Swal from "sweetalert2"
import { Auth } from "../../containers/Auth"

declare let window: any
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

interface Props {
  amount: string
  date: Dayjs | null
  currency: string
}

export const SendFunds: React.FC<Props> = ({ amount, date, currency }) => {
  const bigAmount = ethers.utils.parseEther(String(Number(amount)))

  const overrides = {
    value: bigAmount,
    gasLimit: 1000000,
  }

  // use this version for mainnet inclusion
  // const isCorrectBlockchain = async (
  //   provider: ethers.providers.Web3Provider,
  // ) => {
  //   const { chainId } = await provider.getNetwork()
  //   if (isLocal && chainId !== 43113) {
  //     alert("You are on the wrong network. Please switch to the fuji network.")
  //     return false
  //   }
  //   else if (!isLocal && chainId !== 43114) {
  //     alert(
  //       "You are on the wrong network. Please switch to the avalanche mainnet.",
  //     )
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  //
  // use this version until mainnet

  const { isWalletConnected } = Auth.useContainer()

  const isCorrectBlockchain = async (
    provider: ethers.providers.Web3Provider,
  ) => {
    const { chainId } = await provider.getNetwork()
    if (chainId !== 43113) {
      alert("You are on the wrong network. Please switch to the fuji network.")
      return false
    } else {
      return true
    }
  }

  const sendDeposit = async (): Promise<void> => {
    const doesUserAccept = async (daysToFreeze: number): Promise<boolean> => {
      const isConfirmed = await Swal.fire({
        title: `Are you sure you want to store ${amount} ${currency} for ${daysToFreeze}?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((res) => res.isConfirmed)
      return isConfirmed
    }

    const areFieldsFilled = () => {

    }

    // if (!areFieldsFilled) return

    if (typeof window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Frozr.abi, signer)
      try {
        if (!(await isCorrectBlockchain(provider))) return
        const date1 = dayjs()
        const date2 = dayjs(date)
        const diff = date2.diff(date1, "day", true)
        const daysToFreeze = Math.floor(diff)

        if (!(await doesUserAccept(daysToFreeze))) return

        const transaction = await contract.deposit(daysToFreeze, overrides)
        transaction.wait().then(() => {
          contract.removeAllListeners()
        })
      } catch (err) {
        contract.removeAllListeners()
        console.error(err)
      }
    } else {
      alert("Please install MetaMask to place a bet.")
    }
  }

  return (
    <div className="grid h-1/5 place-content-center">
      <Button
        onClick={sendDeposit}
        className=""
        variant="contained"
        // disabled={!isWalletConnected}
      >
        Store your funds
      </Button>
    </div>
  )
}
