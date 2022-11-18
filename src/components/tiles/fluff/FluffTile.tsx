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

const avaxContractAddress = import.meta.env.VITE_AVAX_CONTRACT_ADDRESS
const bnbContractAddress = import.meta.env.VITE_BSCTESTNET_CONTRACT_ADDRESS
const ethContractAddress = import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
const neonContractAddress = import.meta.env.VITE_NEONDEVNET_CONTRACT_ADDRESS
const dogeContractAddress = import.meta.env.VITE_DOGETESTNET_CONTRACT_ADDRESS

export const FluffTile: React.FC<Props> = ({ layoutTransition }) => {
  const shortenWalletAddress = (walletAddress: string) =>
    `${walletAddress.slice(0, 7)}...${walletAddress.slice(-7)}`

  const addresses: [CurrencyString, string][] = [
    ["AVAX", shortenWalletAddress(avaxContractAddress)],
    ["BNB", shortenWalletAddress(bnbContractAddress)],
    ["ETH", shortenWalletAddress(ethContractAddress)],
    ["NEON", shortenWalletAddress(neonContractAddress)],
    ["DOGE", shortenWalletAddress(dogeContractAddress)],
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
        description={
          <div className="flex flex-col gap-3">
            <div>
              There are no hidden fees. We don't show ads or sell your data.
              There is no upsell for a premium tier.
            </div>
            <div className="text-slate-100">
              Using Frozr is completely free.
            </div>
          </div>
        }
      />
      <Card
        icon={<TbCircleDotted size={40} />}
        title="Fully Decentralized"
        description={
          <div className="flex flex-col gap-3">
            <div>
              A smart-contract holds your funds more securely than a bank vault.
            </div>
            <div className="text-slate-100">
              Only you hold the key, not a business, bank, or even us.
            </div>
          </div>
        }
      />

      <Card
        icon={<VscGithubAlt size={40} />}
        title="Entirely Open Source"
        description={
          <div className="flex flex-col gap-9">
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
        description="Frozr is straightforward and simple. We aim to do one thing well."
      />
      <Card
        icon={<MdOutlineMobiledataOff size={40} />}
        title="No Data Collection"
        description="We don't collect any user data. We don't use cookies or analytics.
             This service runs on web3."
      />

      <Card
        icon={<TbFileSignal size={40} />}
        title="Our Smart Contracts"
        description={
          <div className="flex h-full flex-col justify-evenly">
            {addresses.map(([address, currency]) => (
              <button
                onClick={() => {
                  // open to snowtrace of address
                }}
                key={address}
                className="color-shift mx-2 flex justify-between rounded-full border border-stone-700 bg-slate-600 bg-opacity-90 px-3 py-1 text-xs hover:border-slate-300 hover:text-slate-300 hover:underline"
              >
                <div className=""> {address}</div>
                <div className=""> {currency}</div>
              </button>
            ))}
          </div>
        }
      />
    </motion.div>
  )
}
