import { motion } from "framer-motion"
import CurrencyInput from "react-currency-input-field"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"
import { default as amountLogo } from "/src/assets/chooseAmount.svg"

interface Props {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
}

export const ChooseAmount: React.FC<Props> = ({ amount, setAmount }) => {
  const { isSmall } = WindowSize.useContainer()
  const { amountBorderColor, setAmountBorderColor } = Form.useContainer()
  const { isWalletConnected, barLengths } = Wallet.useContainer()
  const borderColor = isWalletConnected
    ? amountBorderColor + " hover:border-white"
    : "border-gray-400"

  const xPos = isSmall ? 0 : barLengths[3]
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
          x: xPos,
        }}
        transition={{
          delay: 0.1,
          duration: 1,
          type: "spring",
          damping: 16,
          bounce: 0.3,
        }}
        className="flex w-full items-center justify-center overflow-clip rounded-l-xl border-l border-t border-b border-purple-200 border-opacity-30 bg-indigo-200 bg-opacity-40"
      >
        <img
          src={amountLogo}
          alt="amount logo"
          className="h-36 translate-y-4 drop-shadow-2xl"
        />
      </motion.div>
    </div>
  )
}
