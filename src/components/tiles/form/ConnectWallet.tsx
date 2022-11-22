import { Button } from "@mui/material"
import { motion } from "framer-motion"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"
import { default as connectWalletLogo } from "/src/assets/connectWallet.svg"

interface Props {}

export const ConnectWallet: React.FC<Props> = ({}) => {
  const {
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    barLengths,
    setBarLengths,
    refreshDeposits,
  } = Wallet.useContainer()
  const { connectBorderColor, setPage } = Form.useContainer()
  const { isSmall } = WindowSize.useContainer()
  const xPos = isSmall ? 0 : barLengths[0]
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        {!isWalletConnected && (
          <Button
            onClick={() => {
              connectWallet().then(refreshDeposits)
            }}
            className="h-14 w-48"
            variant="outlined"
            sx={{
              fontWeight: "bold",
              borderColor: connectBorderColor,
            }}
          >
            Connect your wallet
          </Button>
        )}
        {isWalletConnected && (
          <Button
            onClick={() => {
              disconnectWallet()
              setBarLengths([0, 15, 30, 45])
              setPage(0)
            }}
            className="h-14 w-48 opacity-30"
            variant="contained"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <motion.div
        initial={{
          x: 400,
        }}
        animate={{
          x: xPos,
        }}
        transition={{
          duration: 5,
          type: "spring",
          damping: 20,
          bounce: 0.7,
        }}
        className="flex w-full items-center justify-center overflow-clip rounded-l-xl border-l border-t border-b border-indigo-200 border-opacity-30 bg-indigo-100 bg-opacity-70"
      >
        <img
          src={connectWalletLogo}
          alt="wallet logo"
          className="h-36 -translate-y-2 drop-shadow-2xl"
        />
      </motion.div>
    </div>
  )
}
