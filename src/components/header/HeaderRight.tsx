import Button from "@mui/material/Button"
import React from "react"
import { Auth } from "../../containers/Auth"

export const HeaderRight: React.FC = () => {
  const { signInWithGoogle, signOutWithGoogle, user } = Auth.useContainer()

  return (
    <div className="mx-3 flex flex-auto items-center justify-end gap-1.5 align-middle">
      {!user && (
        <Button
          variant="contained"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
      )}
      {user && (
        <Button
          variant="contained"
          onClick={signOutWithGoogle}
        >
          Sign Out
        </Button>
      )}
    </div>
  )
}
