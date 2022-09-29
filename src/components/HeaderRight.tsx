import Button from "@mui/material/Button"
import React from "react"
import { Auth } from "../Auth"

export const HeaderRight: React.FC = () => {
  const { signInWithGoogle, signOutWithGoogle, user } = Auth.useContainer()

  return (
    <div>
      {!user && (
        <Button
          color="primary"
          variant="contained"
          className="m-1 rounded bg-green-600 px-1 text-sm"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
      )}
      {user && (
        <Button
          color="secondary"
          variant="outlined"
          className="m-1 rounded bg-rose-900 px-1 text-sm"
          onClick={signOutWithGoogle}
        >
          Sign Out
        </Button>
      )}
    </div>
  )
}
