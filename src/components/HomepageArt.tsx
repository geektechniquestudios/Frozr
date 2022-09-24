import React from "react"
import { Auth } from "../Auth"

export const HomepageArt: React.FC = () => {
  const { user } = Auth.useContainer()
  return (
    <div>
      {!user && (
        <div>
          <img className="h-64" src="src\art\undraw_beach_day_pink.svg" alt="Beach Day" />
        </div>
      )}
    </div>
  )
}
