import { createContainer } from "unstated-next"
import { BigNumber, ethers } from "ethers"
import Frozr from "../artifacts/contracts/Frozr.sol/Frozr.json"
import { useEffect, useState } from "react"
import { Form } from "./Form"
import Swal from "sweetalert2"
import { checkForMetamask } from "../components/prompts/MetamaskNotInstalled"

declare let window: any
const avaxContractAddress = import.meta.env.VITE_AVAX_CONTRACT_ADDRESS
const bnbContractAddress = import.meta.env.VITE_BSCTESTNET_CONTRACT_ADDRESS
const ethContractAddress = import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
const neonContractAddress = import.meta.env.VITE_NEONDEVNET_CONTRACT_ADDRESS
const dogeContractAddress = import.meta.env.VITE_DOGETESTNET_CONTRACT_ADDRESS

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

export type CurrencyString = "AVAX" | "BNB" | "NEON" | "ETH" | "DOGE" | ""

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
    (localStorage.getItem("currency") ?? "AVAX") as CurrencyString,
  )

  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [blockTimestamp, setBlockTimestamp] = useState<number>()
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [barLengths, setBarLengths] = useState<number[]>(
    isWalletConnected ? [10, 0, 15, 35] : [0, 10, 25, 40],
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
      setBarLengths([10, 0, 15, 35])
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

  const currencyMap: Record<
    CurrencyString,
    { chainId?: number; contractAddress?: string }
  > = {
    AVAX: {
      chainId: 43113,
      contractAddress: avaxContractAddress,
    },
    BNB: { chainId: 97, contractAddress: bnbContractAddress },
    ETH: { chainId: 11155111, contractAddress: ethContractAddress },
    NEON: { chainId: 245022926, contractAddress: neonContractAddress },
    DOGE: { chainId: 568, contractAddress: dogeContractAddress },
    "": { chainId: -1 },
  }

  useEffect(() => {
    // always runs twice, confusing pattern that could be improved
    updateNetwork()
  }, [currency])

  const updateNetwork = async (networkName?: CurrencyString) => {
    if (!checkForMetamask()) return
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", [])
    const { chainId } = await provider.getNetwork()
    const isCorrectBlockchain =
      chainId === currencyMap[networkName ?? currency].chainId

    setCurrency(networkName ?? currency)
    localStorage.setItem("currency", networkName ?? currency)
    setIsCorrectNetwork(isCorrectBlockchain)
    if (networkName !== currency) setDeposits([])
    if (isCorrectBlockchain && isWalletConnected) {
      setBarLengths([35, 15, 0, 10])
      refreshDeposits()
    }
    if (!isCorrectBlockchain && isWalletConnected) {
      setBarLengths([10, 0, 15, 35])
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
