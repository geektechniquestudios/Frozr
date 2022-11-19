import { FormTile } from "./tiles/form/FormTile"
import { DepositsTile } from "./tiles/deposits/DepositsTile"
import { HeadingTile } from "./tiles/heading/HeadingTile"
import { Footer } from "./footer/Footer"
import { FluffTiles } from "./tiles/fluff/FluffTiles"
import { LayoutGroup } from "framer-motion"
import "../index.scss"

export const MainContent: React.FC = () => {
  const layoutTransition = {
    duration: 0.28,
  }

  return (
    <div className="flex h-full justify-center">
      <div className="flex max-w-[52em] flex-col gap-3 px-3 pt-4">
        <LayoutGroup>
          <HeadingTile />
          <FormTile />
          <DepositsTile layoutTransition={layoutTransition} />
          <FluffTiles layoutTransition={layoutTransition} />
          <Footer />
        </LayoutGroup>
      </div>
    </div>
  )
}
