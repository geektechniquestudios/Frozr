import { createContainer } from "unstated-next"
import { firebaseApp } from "../../firestore.config"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {
  doc,
  getFirestore,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore"

const db = getFirestore(firebaseApp)

const useAuth = () => {
  const auth = getAuth(firebaseApp)
  const [user] = useAuthState(auth)

  const signInWithGoogle = async () => {
    const addToUsers = () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser!.uid)
        runTransaction(db, async (transaction) => {
          const doc = await transaction.get(userDoc)
          if (!doc.exists()) {
            transaction.set(userDoc, {
              photoURL: auth.currentUser!.photoURL,
              displayName: auth.currentUser!.displayName,
              joinDate: serverTimestamp(),
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
