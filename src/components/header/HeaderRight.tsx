import Button from "@mui/material/Button"
import React from "react"
import { Auth } from "../../containers/Auth"
import { BsWallet2 } from "react-icons/bs"

export const HeaderRight: React.FC = () => {
  const { walletAddress, isWalletConnected } = Auth.useContainer()

  return (
    <div className="mx-1 flex flex-auto items-center justify-end gap-1.5 align-middle">
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
        <a
          className="color-shift rounded-full border border-stone-600 py-1 px-2 text-xs hover:border-slate-300 hover:text-slate-300 hover:underline mx-2 bg-slate-400 bg-opacity-30"
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
        </a>
      )}
    </div>
  )
}
