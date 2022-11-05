import { Button } from "@mui/material"
import { Auth } from "../../containers/Auth"

interface Props {}

export const ConnectWallet: React.FC<Props> = ({}) => {
  const {
    isWalletConnected,
    isWalletConnecting,
    connectWallet,
    disconnectWallet,
  } = Auth.useContainer()
  return (
    <div className="flex h-1/4 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        {!isWalletConnected && (
          <Button onClick={connectWallet} className="w-48" variant="contained">
            Connect your wallet
          </Button>
        )}
        {isWalletConnected && (
          <Button
            onClick={disconnectWallet}
            className="w-48"
            variant="contained"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-slate-500">
        <img src="./src/assets/undraw_pay.svg" alt="wallet" className="h-16" />
        <div />
      </div>
    </div>
  )
}
