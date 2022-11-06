import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const Header: React.FC = () => {
  return (
    <div className="z-50 sticky top-0 flex h-11 shrink-0 w-full items-center justify-center border-b border-stone-700 bg-sky-500 bg-opacity-10 text-xl text-stone-200 backdrop-blur-sm">
      <div className="no-wrap flex w-full justify-between">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </div>
  )
}
