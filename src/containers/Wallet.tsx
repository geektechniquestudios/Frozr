import { createContainer } from "unstated-next"
import { BigNumber, ethers } from "ethers"
import Frozr from "../artifacts/contracts/Frozr.sol/Frozr.json"
import { useState } from "react"

declare let window: any
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

export interface Transaction {
  depositId: string
  amount: BigNumber
  startDate: number
  releaseDate: number
  isComplete: boolean
}

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") !== null
      ? localStorage.getItem("walletAddress")
      : "",
  )
  const [isWalletConnected, setIsWalletConnected] = useState(
    localStorage.getItem("isWalletConnected") !== null
      ? localStorage.getItem("isWalletConnected")! === "true"
      : false,
  )

  const [isWalletConnecting, setIsWalletConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum === undefined) {
      alert("Metamask not installed")
      return
    }
    try {
      setIsWalletConnecting(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const walletAddress = await signer.getAddress()
      setIsWalletConnected(true)
      setIsWalletConnecting(false)
      setWalletAddress(walletAddress)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("isWalletConnected", "true")
    } catch (error) {
      console.error(error)
      alert("Error connecting to wallet.")
      setIsWalletConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setWalletAddress("")
    setIsWalletConnected(false)
    localStorage.setItem("walletAddress", "")
    localStorage.setItem("isWalletConnected", "false")
  }

  const callContract = async (
    contractCallFunction: (contract: ethers.Contract) => any,
    postContractCallFunction?: () => void,
  ) => {
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

    const updateTimestamp = async (provider: ethers.providers.Web3Provider) => {
      provider.getBlock(provider.getBlockNumber()).then((block) => {
        setBlockTimestamp(block.timestamp)
      })
    }

    if (typeof window.ethereum === undefined)
      alert("Please install MetaMask to place a bet.")

    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Frozr.abi, signer)
    try {
      if (!(await isCorrectBlockchain(provider))) return
      updateTimestamp(provider)
      const tx = await contractCallFunction(contract)
      tx &&
        tx.wait().then(() => {
          postContractCallFunction && postContractCallFunction()
        })
    } catch (err) {
      console.error(err)
    } finally {
      contract.removeAllListeners()
    }
  }

  const refreshDeposits = () => {
    callContract(async (contract) => {
      setTransactions(await contract.viewDeposits())
    })
  }

  const [currency, setCurrency] = useState("Avax")
  const [blockTimestamp, setBlockTimestamp] = useState<number>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  return {
    callContract,
    currency,
    setCurrency,
    blockTimestamp,
    transactions,
    setTransactions,
    refreshDeposits,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    setIsWalletConnected,
    isWalletConnecting,
    walletAddress,
  }
}

export const Wallet = createContainer(useWallet)
