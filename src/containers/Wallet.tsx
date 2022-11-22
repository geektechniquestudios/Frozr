import { createContainer } from "unstated-next"
import { BigNumber, ethers } from "ethers"
import Frozr from "../artifacts/contracts/Frozr.sol/Frozr.json"
import { useEffect, useState } from "react"
import { Form } from "./Form"
import Swal from "sweetalert2"
import { checkForMetamask } from "../components/prompts/CheckForMetamask"

declare let window: any
const avaxContractAddress = import.meta.env
  .VITE_AVALANCHEMAINNET_CONTRACT_ADDRESS
const fujiContractAddress = import.meta.env.VITE_FUJI_CONTRACT_ADDRESS
const bnbContractAddress = import.meta.env.VITE_BSC_TESTNET_CONTRACT_ADDRESS
const ethContractAddress = import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
const dogeContractAddress = import.meta.env.VITE_DOGE_TESTNET_CONTRACT_ADDRESS

export interface Deposit {
  depositId: string
  amount: BigNumber
  startDate: number
  releaseDate: number
  isComplete: boolean
}

// Force page refreshes on network changes
{
  // The "any" network will allow spontaneous network changes
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    provider.on("network", (_newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) window.location.reload()
    })
  }
}

export type CurrencyString =
  | "Avalanche"
  | "Fuji Testnet"
  | "BNB Testnet"
  | "Sepolia Testnet"
  | "DOGE Testnet"
  | ""

const currencyMap: Record<
  CurrencyString,
  { chainId?: number; contractAddress?: string }
> = {
  Avalanche: {
    chainId: 43114,
    contractAddress: avaxContractAddress,
  },
  "Fuji Testnet": {
    chainId: 43113,
    contractAddress: fujiContractAddress,
  },
  "BNB Testnet": { chainId: 97, contractAddress: bnbContractAddress },
  "Sepolia Testnet": { chainId: 11155111, contractAddress: ethContractAddress },
  "DOGE Testnet": { chainId: 568, contractAddress: dogeContractAddress },
  "": { chainId: -1 },
}

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string>(
    localStorage.getItem("walletAddress") ?? "",
  )
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(
    localStorage.getItem("isWalletConnected") !== null
      ? localStorage.getItem("isWalletConnected")! === "true"
      : false,
  )

  const [currency, setCurrency] = useState<CurrencyString>(
    (localStorage.getItem("currency") ?? "") as CurrencyString,
  )

  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [blockTimestamp, setBlockTimestamp] = useState<number>()
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [barLengths, setBarLengths] = useState<number[]>(
    isWalletConnected ? [10, 1, 15, 35] : [1, 10, 25, 40],
  )

  const { setConnectBorderColor } = Form.useContainer()

  const connectWallet = async () => {
    if (!checkForMetamask()) return
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const walletAddress = await signer.getAddress()
      setIsWalletConnected(true)
      setWalletAddress(walletAddress)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("isWalletConnected", "true")
      setConnectBorderColor("border-transparent")
      setBarLengths([10, 1, 15, 35])
    } catch (error) {
      console.error(error)
      checkForMetamask()
    }
  }

  const disconnectWallet = async () => {
    setWalletAddress("")
    setIsWalletConnected(false)
    localStorage.setItem("walletAddress", "")
    localStorage.setItem("isWalletConnected", "false")
  }

  useEffect(() => {
    // prevents spamming user on page load if no wallet is connected
    if (typeof window.ethereum === "undefined") {
      disconnectWallet()
      return
    }
    updateNetwork()
  }, [currency])

  const updateNetwork = async (networkName?: CurrencyString) => {
    setCurrency(networkName ?? currency)
    localStorage.setItem("currency", networkName ?? currency)

    if (!checkForMetamask()) return
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", [])
    const { chainId } = await provider.getNetwork()
    const isCorrectBlockchain =
      chainId === currencyMap[networkName ?? currency]?.chainId ?? -1

    setIsCorrectNetwork(isCorrectBlockchain)
    if (networkName !== currency) setDeposits([])
    if (!isCorrectBlockchain && isWalletConnected) {
      setBarLengths([10, 1, 15, 35])
    }
    if (isCorrectBlockchain && isWalletConnected) {
      setBarLengths([35, 15, 1, 10])
      refreshDeposits()
    }
  }

  const callContract = async (
    contractCallFunction: (contract: ethers.Contract) => any,
    postContractCallFunction?: () => void,
  ) => {
    const isCorrectBlockchain = async (
      provider: ethers.providers.Web3Provider,
    ) => {
      const { chainId } = await provider.getNetwork()
      const isCorrectBlockchain = chainId === currencyMap[currency].chainId
      setIsCorrectNetwork(isCorrectBlockchain)
      return isCorrectBlockchain
    }

    const updateTimestamp = async (provider: ethers.providers.Web3Provider) => {
      provider.getBlock(provider.getBlockNumber()).then((block) => {
        setBlockTimestamp(block.timestamp)
      })
    }

    if (!checkForMetamask()) return

    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    const contract = new ethers.Contract(
      currencyMap[currency].contractAddress!,
      Frozr.abi,
      signer,
    )
    try {
      if (!(await isCorrectBlockchain(provider))) {
        contract.removeAllListeners()
        return
      }
      updateTimestamp(provider)
      const tx = await contractCallFunction(contract)
      tx &&
        tx.wait().then(() => {
          contract.removeAllListeners()
          postContractCallFunction && postContractCallFunction()
        })
    } catch (err) {
      console.error(err)
    } finally {
      contract.removeAllListeners()
    }
  }

  const refreshDeposits = () => {
    if (currency === "") return
    callContract(async (contract) => {
      setDeposits(await contract.viewDeposits())
    })
  }

  const doesUserHaveEnoughAvax = async (price: BigNumber) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const balance: BigNumber = await provider.getBalance(walletAddress!)
    const doesUserHaveEnoughAvax = balance.gte(price)
    if (!doesUserHaveEnoughAvax) {
      Swal.fire({
        title: "Insufficient Funds",
        text: `You don't have enough ${currency} to place this bet.`,
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
    return doesUserHaveEnoughAvax
  }

  return {
    callContract,
    currency,
    setCurrency,
    blockTimestamp,
    deposits,
    setDeposits,
    refreshDeposits,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    setIsWalletConnected,
    walletAddress,
    isCorrectNetwork,
    updateNetwork,
    doesUserHaveEnoughAvax,
    barLengths,
    setBarLengths,
  }
}

export const Wallet = createContainer(useWallet)
