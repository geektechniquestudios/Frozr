import React from "react"
import { Auth } from "../Auth"

export const HeaderRight: React.FC = () => {
  const { signInWithGoogle, signOutWithGoogle, auth, user } =
    Auth.useContainer()

  return (
    <div>
      {!user && (
        <button
          className="m-1 rounded bg-green-600 px-1 text-sm"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
      )}
      {user && (
        <button
          className="m-1 rounded bg-rose-900 px-1 text-sm"
          onClick={signOutWithGoogle}
        >
          Sign Out
        </button>
      )}
    </div>
  )
}
