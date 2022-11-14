import { motion } from "framer-motion"
import CurrencyInput from "react-currency-input-field"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { default as amountLogo } from "/src/assets/undraw_eth.svg"

interface Props {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
}

export const ChooseAmount: React.FC<Props> = ({ amount, setAmount }) => {
  const { amountBorderColor, setAmountBorderColor } = Form.useContainer()
  const { isWalletConnected } = Wallet.useContainer()
  const borderColor = isWalletConnected
    ? amountBorderColor + " hover:border-white"
    : "border-gray-400"
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        <CurrencyInput
          disabled={!isWalletConnected}
          className={`${borderColor} h-14 w-48 rounded-md border bg-transparent py-1 px-3 text-stone-200 `}
          onFocus={() => {
            setAmountBorderColor("")
          }}
          autoComplete="off"
          placeholder="Choose an Amount"
          defaultValue=""
          decimalsLimit={18}
          value={amount}
          onValueChange={(value) => {
            setAmount(value ?? "")
          }}
          allowNegativeValue={false}
          onBlur={(e) => {
            setAmount(e.target.value)
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && e.currentTarget.blur()
          }}
        />
      </div>
      <motion.div
        initial={{
          x: 400,
        }}
        animate={{
          x: 30,
        }}
        transition={{
          // delay: 0.3,
          duration: 1,
          type: "spring",
          damping: 16,
          bounce: 0.3,
        }}
        className="flex w-full items-center justify-start rounded-l-xl border-l border-t border-b border-stone-600 bg-gray-200 bg-opacity-70 sm:px-6"
      >
        <img src={amountLogo} alt="amount logo" className="h-16" />
      </motion.div>
    </div>
  )
}
