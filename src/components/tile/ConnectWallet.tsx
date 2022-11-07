import { Button } from "@mui/material"
import { Auth } from "../../containers/Auth"

interface Props {}

export const ConnectWallet: React.FC<Props> = ({}) => {
  const { isWalletConnected, connectWallet, disconnectWallet } =
    Auth.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        {!isWalletConnected && (

            <Button
              onClick={connectWallet}
              className="w-48 h-14"
              variant="outlined"
              sx={{ fontWeight: "bold", color: "" }}
            >
              Connect your wallet
            </Button>
        )}
        {isWalletConnected && (
          <Button
            onClick={disconnectWallet}
            className="w-48 opacity-30 h-14"
            variant="contained"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-indigo-100 bg-opacity-70">
        <img src="./src/assets/undraw_pay.svg" alt="wallet" className="h-16" />
        <div />
      </div>
    </div>
  )
}
