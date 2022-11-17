import { motion } from "framer-motion"
import { MdMoneyOffCsred, MdOutlineMobiledataOff } from "react-icons/md"
import { Card } from "./Card"
import { VscGithubAlt } from "react-icons/vsc"
import { TbCircleDotted, TbFileSignal } from "react-icons/tb"
import { FaPoo } from "react-icons/fa"

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
      className=" grid gap-3 rounded-md text-slate-200 md:grid-cols-3"
    >
      <Card
        icon={<MdMoneyOffCsred size={40} />}
        title="Actually Free"
        description=""
        // description={
        //   <div>
        //     <div>
        //       There are no hidden fees. We don't show ads or sell your data.
        //       There is no upsell for a premium tier.
        //     </div>
        //     <div className=" text-slate-400">
        //       Using Frozr is completely free.
        //     </div>
        //   </div>
        // }
      />
      <Card
        icon={<TbCircleDotted size={40} />}
        title="Fully Decentralized"
        description="A trustless smart-contract holds your funds. Your investment is
              kept safe in a protocol running on the blockchain, not with an
              individual, business, or bank."
      />

      <Card
        icon={<VscGithubAlt size={40} />}
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
        icon={<FaPoo size={40} />}
        title="No Frills"
        description="Frozr is straightforward and simple. We aim to do one thing well."
      />
      <Card
        icon={<MdOutlineMobiledataOff size={40} />}
        title="No Data Collection"
        description="We don't collect any data on you. We don't even have a database. Everything is stored in the smart contract."
      />

      <Card
        icon={<TbFileSignal size={40} />}
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
