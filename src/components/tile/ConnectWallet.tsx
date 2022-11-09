import { Button } from "@mui/material"
import { Auth } from "../../containers/Auth"
import { Form } from "../../containers/Form"
import { default as connectWalletLogo } from "/src/assets/undraw_pay.svg"

interface Props {}

export const ConnectWallet: React.FC<Props> = ({}) => {
  const { isWalletConnected, connectWallet, disconnectWallet } =
    Auth.useContainer()
  const { connectBorderColor, setPage } = Form.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        {!isWalletConnected && (
          <Button
            onClick={connectWallet}
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
              setPage(0)
            }}
            className="h-14 w-48 opacity-30"
            variant="contained"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-indigo-100 bg-opacity-70">
        <img src={connectWalletLogo} alt="wallet logo" className="h-16" />
        <div />
      </div>
    </div>
  )
}
