import React from "react"
import { firebaseApp } from "../../config"
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import {
  doc,
  getFirestore,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export const HeaderRight: React.FC = () => {
  const auth = getAuth(firebaseApp)
  const signInWithGoogle = async () => {
    const addToUsers = () => {
      if (auth?.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser!.uid)
        runTransaction(db, async transaction => {
          const doc = await transaction.get(userDoc)
          if (!doc.exists()) {
            transaction.set(userDoc, {
              photoURL: auth.currentUser!.photoURL,
              displayName: auth.currentUser!.displayName,
              joinDate: serverTimestamp(),
              families: [],
            })
          }
        })
      }
    }
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider).then(addToUsers)
  }

  return (
    <div>
      <button
        className="m-1 rounded bg-green-600 px-1 text-sm"
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
    </div>
  )
}
