import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { motion } from "framer-motion"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"

import { default as selectCurrencyLogo } from "/src/assets/undraw_currency.svg"

interface Props {}

export const SelectCurrency: React.FC<Props> = ({}) => {
  const { currencyBorderColor, setPage, setCurrencyBorderColor } =
    Form.useContainer()
  const {
    barLengths,
    setBarLengths,
    currency,
    isCorrectNetwork,
    updateNetwork,
    isWalletConnected,
  } = Wallet.useContainer()
  const { isSmall } = WindowSize.useContainer()
  const xPos = isSmall ? 0 : barLengths[1]
  const label = isCorrectNetwork
    ? "Select a Currency"
    : "Change Your Wallet's Network"
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="p-3">
        <FormControl
          fullWidth
          disabled={!isWalletConnected}
          onFocus={() => {
            setCurrencyBorderColor("border-transparent")
          }}
        >
          <InputLabel>
            <div className={`${isCorrectNetwork ? "" : "text-yellow-500"}`}>
              {label}
            </div>
          </InputLabel>
          <Select
            className={`${currencyBorderColor} w-48 border`}
            value={currency}
            label={label}
            onChange={() => {
              setPage(0)
            }}
          >
            <MenuItem
              value="AVAX"
              onClick={() => {
                updateNetwork("AVAX")
              }}
            >
              AVAX
            </MenuItem>
            <MenuItem
              value="BNB"
              onClick={() => {
                updateNetwork("BNB")
              }}
            >
              BNB
            </MenuItem>
            <MenuItem
              value="NEON"
              onClick={() => {
                updateNetwork("NEON")
              }}
            >
              NEON
            </MenuItem>
            <MenuItem
              value="ETH"
              onClick={() => {
                updateNetwork("ETH")
              }}
            >
              ETHER
            </MenuItem>
            <MenuItem
              value="DOGE"
              onClick={() => {
                updateNetwork("DOGE")
              }}
            >
              DOGE
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <motion.div
        initial={{
          x: 400,
        }}
        animate={{
          x: xPos,
        }}
        transition={{
          delay: 0.05,
          duration: 5,
          type: "spring",
          damping: 20,
          bounce: 0.7,
        }}
        className="flex w-full items-center justify-center rounded-l-xl border-l border-t border-b border-stone-600 bg-slate-400"
      >
        <img src={selectCurrencyLogo} alt="currency logo" className="h-16" />
      </motion.div>
    </div>
  )
}
