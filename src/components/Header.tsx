import { HeaderLeft } from "./HeaderLeft"
import { HeaderMiddle } from "./HeaderMiddle"
import { HeaderRight } from "./HeaderRight"

export const Header: React.FC = () => {
  return (
      <div className="sticky top-0 flex h-11 w-full items-center justify-center border border-sky-600 bg-sky-700 text-xl text-zinc-300">
        <div className="no-wrap flex w-full justify-between">
          <HeaderLeft />
          <HeaderMiddle />
          <HeaderRight />
        </div>
      </div>
  )
}
