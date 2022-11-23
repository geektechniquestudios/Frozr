import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { motion } from "framer-motion"
import { Form } from "../../../containers/Form"
import { Wallet } from "../../../containers/Wallet"
import { WindowSize } from "../../../containers/WindowSize"

import { default as selectCurrencyLogo } from "/src/assets/selectCurrency.svg"

interface Props {}

export const SelectCurrency: React.FC<Props> = ({}) => {
  const { currencyBorderColor, setPage, setCurrencyBorderColor } =
    Form.useContainer()
  const {
    barLengths,
    currency,
    isCorrectNetwork,
    updateNetwork,
    isWalletConnected,
  } = Wallet.useContainer()
  const { isSmall } = WindowSize.useContainer()
  const xPos = isSmall ? 0 : barLengths[1]
  const label =
    isCorrectNetwork || !isWalletConnected || currency === ""
      ? "Select a Currency"
      : "Update Your Wallet"
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
            <div
              className={`${
                isCorrectNetwork || !isWalletConnected || currency === ""
                  ? ""
                  : "text-yellow-500"
              }`}
            >
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
              value="Avalanche"
              onClick={() => {
                updateNetwork("Avalanche")
              }}
            >
              Avalanche
            </MenuItem>
            <MenuItem
              value="BNB BEP20"
              onClick={() => {
                updateNetwork("BNB BEP20")
              }}
            >
              BNB BEP20
            </MenuItem>
            <MenuItem
              value="Fuji Testnet"
              onClick={() => {
                updateNetwork("Fuji Testnet")
              }}
            >
              Fuji Testent
            </MenuItem>
            <MenuItem
              value="BNB Testnet"
              onClick={() => {
                updateNetwork("BNB Testnet")
              }}
            >
              BNB Testent
            </MenuItem>
            <MenuItem
              value="Sepolia Testnet"
              onClick={() => {
                updateNetwork("Sepolia Testnet")
              }}
            >
              Sepolia Testent
            </MenuItem>
            <MenuItem
              value="DOGE Testnet"
              onClick={() => {
                updateNetwork("DOGE Testnet")
              }}
            >
              DOGE Testent
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
        className="flex w-full items-center justify-center overflow-clip rounded-l-xl border-l border-t border-b border-violet-200 border-opacity-30 bg-purple-100 bg-opacity-50"
      >
        <img
          src={selectCurrencyLogo}
          alt="currency logo"
          className="h-40 translate-y-2 drop-shadow-2xl"
        />
      </motion.div>
    </div>
  )
}
