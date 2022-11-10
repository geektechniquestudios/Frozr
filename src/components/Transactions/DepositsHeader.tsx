import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"
import { Transaction, Wallet } from "../../containers/Wallet"

interface Props {
  isNextDisabled: boolean
  isPrevDisabled: boolean
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  transactions: Transaction[]
}

export const DepositsHeader: React.FC<Props> = ({
  isNextDisabled,
  isPrevDisabled,
  page,
  setPage,
  transactions,
}) => {
  const { currency, isWalletConnected } = Wallet.useContainer()
  return (
    <div className="flex w-full justify-between gap-2 px-2">
      <button
        title={!isPrevDisabled ? "Previous" : ""}
        onClick={() => setPage(page - 1)}
        disabled={isPrevDisabled}
        className="grid place-content-center"
      >
        <MdOutlineNavigateBefore
          size={29}
          className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
            isPrevDisabled
              ? "text-slate-500"
              : "text-slate-200 hover:border-slate-300"
          }`}
        />
      </button>
      <p className="grid h-14 w-full place-content-center text-center text-xl font-extrabold text-stone-300 sm:text-2xl">
        {transactions.length == 0 || !isWalletConnected
          ? "No Deposits To Show"
          : `Your ${currency} Deposits`}
      </p>
      <button
        title={!isNextDisabled ? "Next" : ""}
        onClick={() => setPage(page + 1)}
        disabled={isNextDisabled}
        className="grid place-content-center"
      >
        <MdOutlineNavigateNext
          size={29}
          className={`color-shift rounded-full border border-slate-500 bg-slate-600 bg-opacity-50 ${
            isNextDisabled
              ? "text-slate-500"
              : "text-slate-200 hover:border-slate-300"
          }`}
        />
      </button>
    </div>
  )
}
