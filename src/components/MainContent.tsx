import { TransactionTile } from "./tile/TransactionTile"
import { TransactionList } from "./Transactions/TransactionList"
import { VaultCard } from "./VaultCard"

export const MainContent: React.FC = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="flex max-w-[42em] grow flex-col gap-3 bg-stone-700 p-5">
        <VaultCard />
        <TransactionTile />
        <TransactionList />
      </div>
    </div>
  )
}
