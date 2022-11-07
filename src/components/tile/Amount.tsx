import CurrencyInput from "react-currency-input-field"
import { Form } from "../../containers/Form"

interface Props {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
}

export const Amount: React.FC<Props> = ({ amount, setAmount }) => {
  const { amountBorderColor } = Form.useContainer()
  return (
    <div className="flex h-1/5 justify-evenly gap-4 py-1">
      <div className="grid place-content-center p-3">
        <CurrencyInput
          className={`${amountBorderColor} h-14 w-48 rounded-md border bg-transparent py-1 px-3 text-stone-200 hover:border-white`}
          autoComplete="off"
          placeholder="Choose amount"
          defaultValue=""
          decimalsLimit={18}
          value={amount}
          onValueChange={(value) => {
            setAmount(value ?? "")
          }}
          allowNegativeValue={false}
          onBlur={(e) => {
            const newValue = Number(e.target.value.replace(/,/g, "") ?? 0)
            setAmount(String(newValue))
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && e.currentTarget.blur()
          }}
        />
      </div>
      <div className="flex w-full items-center justify-evenly rounded-l-xl border-l border-t border-b border-stone-600 bg-gray-200 bg-opacity-70">
        <div />
        <img
          src="./src/assets/undraw_eth.svg"
          alt="underdraw_eth.svg"
          className="h-16"
        />
      </div>
    </div>
  )
}
