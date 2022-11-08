import { useEffect, useState } from "react"
import { Auth } from "../../containers/Auth"
import { BigNumber } from "ethers"
import { Form } from "../../containers/Form"
import { Deposit } from "./Deposit"
import { Wallet } from "../../containers/Wallet"

export interface Transaction {
  depositId: string
  amount: BigNumber
  startDate: BigNumber
  releaseDate: BigNumber
  currency: string
  isComplete: boolean
}

interface Props {}

export const Deposits: React.FC<Props> = ({}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { isWalletConnected } = Auth.useContainer()
  const { deposits } = Form.useContainer()
  const { callContract } = Wallet.useContainer()

  useEffect(() => {
    if (!isWalletConnected) return
    callContract(async (contract) => {
      setTransactions(await contract.viewDeposits())
    })
  }, [deposits, isWalletConnected])

  console.log(transactions)

  return (
    <>
      {isWalletConnected && transactions.length > 0 && (
        <div
          className="scrollbar h-[32em] shrink-0 overflow-auto rounded-md border border-stone-600 bg-gray-500 bg-opacity-30 p-4"
          style={{
            backdropFilter: "blur(16px)",
          }}
        >
          {/* say something about how you will only see transactions from the network your wallet is on */}
          <p className="mb-2 grid h-14 w-full place-content-center border-b border-slate-400 text-2xl font-extrabold text-stone-300">
            Your Deposits
          </p>
          <div
            className="flex flex-col gap-2"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: [0, 0, 1], translateY: 0 }}
            // exit={{ opacity: 0, translateX: 30 }}
            // transition={{
            //   duration: 0.7,
            //   type: "spring",
            //   stiffness: 40,
            // }}
          >
            {[...transactions].reverse().map((transaction: Transaction, i) => (
              <Deposit {...transaction} key={i} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
