import { useState } from "react"
import { Transaction } from "./Transaction"

interface Props {}

export const TransactionList: React.FC<Props> = ({}) => {
  const [transactions, setTransactions] = useState([])
  // if wallet is connected, load transactions from the blockchain
  // use effect "iswalletconnected" to load transactions
  // if loading, show spinner
  // if no transactions, show "no transactions"
  return (
    <div>
      <p className="flex w-full justify-center border-b text-stone-300">
        Your Deposits
      </p>
      <div className="flex flex-col gap-2">
        {transactions.map((transaction: any) => (
          <Transaction />
        ))}
      </div>
    </div>
  )
}
