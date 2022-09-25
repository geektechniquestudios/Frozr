import { createContainer } from "unstated-next"
import { firebaseApp } from "../config"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {
  doc,
  getFirestore,
  serverTimestamp,
  runTransaction,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore"

const db = getFirestore(firebaseApp)

const useAuth = () => {
  const auth = getAuth(firebaseApp)
  const [user] = useAuthState(auth)

  const signInWithGoogle = async () => {
    const addToUsers = () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser!.uid)
        const familyDoc = doc(db, "families", auth.currentUser!.uid + "-family")
        runTransaction(db, async transaction => {
          const doc = await transaction.get(userDoc)
          if (!doc.exists()) {
            transaction.set(userDoc, {
              photoURL: auth.currentUser!.photoURL,
              displayName: auth.currentUser!.displayName,
              joinDate: serverTimestamp(),
              families: [auth.currentUser!.uid + "-family"],
            })
            transaction.set(familyDoc, {
              users:[auth.currentUser!.uid],
            })
          }
        })
      }
    }

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(addToUsers)
  }

  const signOutWithGoogle = async () => {
    auth.signOut()
  }

  return {
    auth,
    user,
    signInWithGoogle,
    signOutWithGoogle,
  }
}

export const Auth = createContainer(useAuth)
