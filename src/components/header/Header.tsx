import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const Header: React.FC = () => {
  return (
    <div className="sticky top-0 flex h-12 w-full items-center justify-center border-b border-stone-500 bg-stone-900 text-xl text-stone-200">
      <div className="no-wrap flex w-full justify-between">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </div>
  )
}
