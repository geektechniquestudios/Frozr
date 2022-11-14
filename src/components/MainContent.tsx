import { FormTile } from "./tiles/form/FormTile"
import { DepositsTile } from "./tiles/deposits/DepositsTile"
import { HeadingTile } from "./tiles/heading/HeadingTile"
import { Footer } from "./footer/Footer"
import { FluffTile } from "./tiles/fluff/FluffTile"
import "../index.scss"
import { LayoutGroup } from "framer-motion"

export const MainContent: React.FC = () => {
  const layoutTransition = {
    duration: 0.28,
  }

  return (
    <div className="flex h-full justify-center">
      <div className="flex max-w-[52em] grow flex-col gap-3 px-3 pt-4">
        <LayoutGroup>
          <HeadingTile />
          <FormTile />
          <DepositsTile layoutTransition={layoutTransition} />
          <FluffTile layoutTransition={layoutTransition} />
          <Footer />
        </LayoutGroup>
      </div>
    </div>
  )
}
