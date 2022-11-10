import { FormTile } from "./tiles/form/FormTile"
import { Deposits } from "./tiles/deposits/Deposits"
import { HeadingBlurb } from "./tiles/deposits/HeadingBlurb"
import { Footer } from "./footer/Footer"
import { FluffTile } from "./tiles/fluff/FluffTile"
import "../index.scss"

export const MainContent: React.FC = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="flex max-w-[42em] grow flex-col gap-3 px-3 pt-4">
        <HeadingBlurb />
        <FormTile />
        <Deposits />
        <FluffTile />
        <Footer />
      </div>
    </div>
  )
}
