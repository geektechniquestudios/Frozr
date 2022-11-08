import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Auth } from "../../containers/Auth"
import { BigNumber, ethers } from "ethers"
import Frozr from "../../artifacts/contracts/Frozr.sol/Frozr.json"
import { Form } from "../../containers/Form"
import { Deposit } from "./Transaction"

declare let window: any
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

export interface Transaction {
  amount: BigNumber
  releaseDate: BigNumber
  currency: string
  isComplete: boolean
}

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { isWalletConnected } = Auth.useContainer()
  const { deposits } = Form.useContainer()

  const getTransactions = async () => {
    const isCorrectBlockchain = async (
      provider: ethers.providers.Web3Provider,
    ) => {
      const { chainId } = await provider.getNetwork()
      if (chainId !== 43113) {
        alert(
          "You are on the wrong network. Please switch to the fuji network.",
        )
        return false
      } else {
        return true
      }
    }

    if (typeof window.ethereum === undefined) {
      alert("Please install MetaMask to place a bet.")
      return
    }
    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Frozr.abi, signer)
    try {
      if (!(await isCorrectBlockchain(provider))) return

      const transactions = await contract.viewDeposits()
      setTransactions(transactions)
      contract.removeAllListeners()
    } catch (err) {
      contract.removeAllListeners()
      console.error(err)
    }
  }

  useEffect(() => {
    if (!isWalletConnected) return
    getTransactions()
  }, [deposits, isWalletConnected])

  return (
    <>
      {isWalletConnected && (
        <div
          className="h-[32em] shrink-0 grow rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-4"
          style={{
            backdropFilter: "blur(16px)",
          }}
        >
          {/* say something about how you will only see transactions from the network your wallet is on */}
          <p className="grid h-14 w-full place-content-center border-b border-slate-400 text-2xl font-extrabold text-stone-300">
            Your Deposits
          </p>
          <div
            className="flex flex-col gap-2"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: [0, 0, 1], translateY: 0 }}
            // exit={{ opacity: 0, translateX: 30 }}
            // transition={{
            //   duration: 0.7,
            //   type: "spring",
            //   stiffness: 40,
            // }}
          >
            {transactions.map((transaction: Transaction, i) => (
              <Deposit {...transaction} key={i} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
