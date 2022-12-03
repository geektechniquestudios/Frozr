import { motion } from "framer-motion"
import { MdMoneyOffCsred, MdOutlineMobiledataOff } from "react-icons/md"
import { Card } from "./Card"
import { VscGithubAlt } from "react-icons/vsc"
import { TbCircleDotted, TbFileSignal } from "react-icons/tb"
import { FaPoo } from "react-icons/fa"
import { CurrencyString } from "../../../containers/Wallet"

interface Props {
  layoutTransition: {}
}

const avaxMainnetContractAddress = import.meta.env
  .VITE_AVALANCHE_MAINNET_CONTRACT_ADDRESS
const fujiTestnetContractAddress = import.meta.env
  .VITE_FUJI_TESTNET_CONTRACT_ADDRESS
const bnbMainnetContractAddress = import.meta.env
  .VITE_BSC_MAINNET_CONTRACT_ADDRESS
const bnbTestnetContractAddress = import.meta.env
  .VITE_BSC_TESTNET_CONTRACT_ADDRESS
const sepoliaTestnetContractAddress = import.meta.env
  .VITE_SEPOLIA_TESTNET_CONTRACT_ADDRESS
const dogeTestnetContractAddress = import.meta.env
  .VITE_DOGE_TESTNET_CONTRACT_ADDRESS

export const FluffTiles: React.FC<Props> = ({ layoutTransition }) => {
  const shortenWalletAddress = (walletAddress: string) =>
    `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`

  const addresses: [CurrencyString, string, string, string][] = [
    [
      "Avalanche",
      shortenWalletAddress(avaxMainnetContractAddress),
      avaxMainnetContractAddress,
      "https://snowtrace.io/address/" + avaxMainnetContractAddress,
    ],
    [
      "BNB BEP20",
      shortenWalletAddress(bnbMainnetContractAddress),
      bnbMainnetContractAddress,
      "https://bscscan.com/address/" + bnbMainnetContractAddress,
    ],
    [
      "Fuji Testnet",
      shortenWalletAddress(fujiTestnetContractAddress),
      fujiTestnetContractAddress,
      "https://cchain.explorer.avax-test.network/address/" +
        fujiTestnetContractAddress,
    ],
    [
      "BNB Testnet",
      shortenWalletAddress(bnbTestnetContractAddress),
      bnbTestnetContractAddress,
      "https://testnet.bscscan.com/address/" + bnbTestnetContractAddress,
    ],
    // [
    //   "Sepolia Testnet",
    //   shortenWalletAddress(sepoliaTestnetContractAddress),
    //   sepoliaTestnetContractAddress,
    //   "https://etherscan.io/address" + sepoliaTestnetContractAddress,
    // ],
    [
      "DOGE Testnet",
      shortenWalletAddress(dogeTestnetContractAddress),
      dogeTestnetContractAddress,
      "https://explorer-testnet.dogechain.dog/address/" +
        dogeTestnetContractAddress,
    ],
  ]

  return (
    <motion.div
      transition={layoutTransition}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.09,
            when: "beforeChildren",
            type: "tween",
          },
        },
      }}
      className=" grid gap-3 rounded-md text-slate-200 sm:grid-cols-2 md:grid-cols-3"
    >
      <Card
        icon={<MdMoneyOffCsred size={40} />}
        title="Actually Free"
        description1="There are no hidden fees. We don't show ads or sell your data.
              There is no upsell for a premium tier."
        description2="Using Frozr is completely free."
      />
      <Card
        icon={<TbCircleDotted size={40} />}
        title="Fully Decentralized"
        description1="A smart-contract holds your funds more securely than a bank vault."
        description2="Only you hold the key, not a business, bank, or even us."
      />

      <Card
        icon={<VscGithubAlt size={40} />}
        title="Entirely Open Source"
        description1={
          <div className="flex flex-col gap-4">
            <div>
              View the code for yourself on{" "}
              <a
                href="https://github.com/geektechniquestudios/Frozr"
                className="underline underline-offset-2"
              >
                github
              </a>
              .
            </div>
            <div className="text-slate-100">
              We take pride in full transparency of every line of code.
            </div>
          </div>
        }
      />
      <Card
        icon={<FaPoo size={40} />}
        title="No BS"
        description1="Frozr is straightforward and simple. No gimmicks."
        description2="We aim to do one thing well."
      />
      <Card
        icon={<MdOutlineMobiledataOff size={40} />}
        title="No Data Collection"
        description1="We don't collect any user data. We don't use cookies or tracking analytics."
        description2="Frozr is a Web3 service. Your data is yours."
      />

      <Card
        icon={<TbFileSignal size={40} />}
        title="Our Smart Contracts"
        description1={
          <div className="grid grid-cols-2 items-center justify-evenly gap-2 sm:flex sm:flex-col">
            {addresses.map(([currency, shortenedAddress, fullAddress, url]) => (
              <div className="flex items-center justify-center" key={currency}>
                <a
                  title={`${currency}: ${fullAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={url}
                  className="color-shift mx-2 flex h-10 w-full flex-col items-center justify-between rounded-full border border-slate-500 bg-slate-600 bg-opacity-90 px-3 py-1 text-xs hover:border-slate-300 hover:text-slate-300 hover:underline sm:h-7 sm:w-48 sm:flex-row"
                >
                  <div className="mr-2 w-20 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currency}
                  </div>
                  <div>{shortenedAddress}</div>
                </a>
              </div>
            ))}
          </div>
        }
      />
    </motion.div>
  )
}
