import { Button } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
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
    isWalletConnecting,
  } = Wallet.useContainer()
  const { connectBorderColor, setPage } = Form.useContainer()
  const { isSmall, width } = WindowSize.useContainer()
  const xPos = isSmall ? 0 : barLengths[0]
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        {!isWalletConnected && (
          <Button
            disabled={isWalletConnecting}
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
            {isWalletConnecting ? (
              <div>
                <>Waiting for Wallet</>
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 4.3],
                    opacity: [1, 0],
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 2.2,
                    ease: "easeOut",
                    times: [0, 0.5],
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-blue-400 bg-sky-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 2.2,
                    times: [0, 0.03, 0.21],
                    repeat: Infinity,
                  }}
                />
              </div>
            ) : (
              "Connect Your Wallet"
            )}
          </Button>
        )}
        {isWalletConnected && (
          <Button
            onClick={() => {
              disconnectWallet()
              setBarLengths([1, 15, 30, 45])
              setPage(0)
            }}
            className="h-14 w-48 opacity-30"
            variant="contained"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <AnimatePresence>
        {width > 350 && (
          <motion.div
            initial={{
              x: 400,
            }}
            animate={{
              x: xPos,
            }}
            exit={{
              x: 400,
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
        )}
      </AnimatePresence>
    </div>
  )
}
