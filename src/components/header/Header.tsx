import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const Header: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 flex h-11 w-full shrink-0 items-center justify-center border-b border-blue-600 border-opacity-10 bg-sky-500 bg-opacity-10 text-xl text-stone-200 backdrop-blur-sm">
      <div className="no-wrap flex w-full justify-between">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </div>
  )
}
