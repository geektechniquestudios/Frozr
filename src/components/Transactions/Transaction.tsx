import { BigNumber } from "ethers"

interface Props {
  amount: BigNumber
  releaseDate: BigNumber
  currency: string
}

export const Deposit: React.FC<Props> = ({ amount }) => {
  return <div className="">{amount.toString()}</div>
}
