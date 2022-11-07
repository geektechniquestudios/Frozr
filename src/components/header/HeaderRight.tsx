import React from "react"
import { Auth } from "../../containers/Auth"
import { BsWallet2 } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"

export const HeaderRight: React.FC = () => {
  const { walletAddress, isWalletConnected } = Auth.useContainer()

  return (
    <div className="mx-1 flex flex-auto items-center justify-end gap-1.5 align-middle">
      <AnimatePresence>
        {/* {!user && (
        <Button
          variant="contained"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
      )}
      {user && (
        <Button
          variant="contained"
          onClick={signOutWithGoogle}
        >
          Sign Out
        </Button>
      )} */}
        {isWalletConnected && (
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1], translateY: 0 }}
            exit={{ opacity: 0, translateX: 30 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 40,
            }}
            className="color-shift mx-2 rounded-full border border-stone-600 bg-slate-400 bg-opacity-30 py-1 px-2 text-xs hover:border-slate-300 hover:text-slate-300 hover:underline"
            title={"View Wallet on Snowtrace"}
            href={"https://snowtrace.io/address/" + walletAddress}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex gap-1">
              <div className="mt-0.5">
                <BsWallet2 />
              </div>
              {walletAddress?.substring(0, 6)}...
              {walletAddress?.substring(
                walletAddress.length - 4,
                walletAddress.length,
              )}
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
