import { motion } from "framer-motion"
import { Card } from "./Card"
import "./photo-grid.scss"

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

  const addresses: string[] = [
    "AVAX " + shortenWalletAddress(avaxContractAddress),
    "BNB " + shortenWalletAddress(bnbContractAddress),
    "ETH " + shortenWalletAddress(ethContractAddress),
    "NEON " + shortenWalletAddress(neonContractAddress),
    "DOGE " + shortenWalletAddress(dogeContractAddress),
  ]
  return (
    <motion.div
      layout
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
      transition={layoutTransition}
      className="photo-grid grid gap-3 rounded-md text-slate-200"
    >
      <Card
        title="Fully Decentralized"
        description="A trustless smart-contract holds your funds. Your investment is
              kept safe in a protocol running on the blockchain, not with an
              individual, business, or bank."
      />

      <Card
        title="Entirely Open Source"
        description={
          <div>
            View the code for yourself on{" "}
            <a
              href="https://github.com/geektechniquestudios/Frozr"
              className="underline underline-offset-2"
            >
              github
            </a>
          </div>
        }
      />
      <Card
        title="No Frills"
        description="Frozr is straightforward and simple. We aim to do one thing well."
      />
      <Card
        title="No Data Collection"
        description="We don't collect any data on you. We don't even have a database. Everything is stored in the smart contract."
      />
      <Card
        title="Actually Free"
        description={
          <div>
            <div>
              There are no hidden fees. We don't show ads or sell your data.
              There is no upsell for a premium tier.
            </div>
            <div className=" text-slate-400">
              Using Frozr is completely free.
            </div>
          </div>
        }
      />
      <Card
        title="Our Smart Contracts"
        description={
          <div className="flex h-full flex-col justify-evenly">
            {addresses.map((address) => (
              <button
                onClick={() => {
                  // open to snowtrace of address
                }}
                key={address}
                className="color-shift mx-2 rounded-full border border-stone-700 bg-slate-600 bg-opacity-90 py-1 px-2 text-xs hover:border-slate-300 hover:text-slate-300 hover:underline"
              >
                {address}
              </button>
            ))}
          </div>
        }
      />
    </motion.div>
  )
}
