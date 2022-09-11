import { useEffect, useState } from "react"
import { firebaseApp } from "../config"
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore"
import * as React from "react"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { blue, green, orange } from "@mui/material/colors"

const db = getFirestore(firebaseApp)

export const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const countCollectionRef = collection(db, "count")
  const countDocRef = doc(countCollectionRef, "counter")
  const auth = getAuth(firebaseApp)

  const storeCountInFirestore = (count: Number) => {
    setDoc(countDocRef, { value: count })
  }

  const [am, setAm] = useState(false)
  const daysColRef = collection(db, "days")
  const dayDocRef = doc(daysColRef, "day")

  const storeAmInFirestore = (am: Boolean) => {
    setDoc(dayDocRef, { am })
  }

  useEffect(() => {
    getDoc(countDocRef).then(doc => {
      setCount(doc.data()?.value)
    })
    getDoc(dayDocRef).then(doc => {
      setAm(doc.data()?.am)
    })
  }, [])

  const [isChecked, setIsAmChecked] = useState(false)
  const [isPmChecked, setIsPmChecked] = useState(false)

  const handleAmOnChange = () => {
    setIsAmChecked(!isChecked)
    storeCountInFirestore(count + 1)
    setCount(count + 1)
    setAm(true)
    storeAmInFirestore(!am)
  }
  const handlePmOnChange = () => {
    setIsPmChecked(!isPmChecked)
    storeCountInFirestore(count - 1)
    setCount(count - 1)
  }

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
    <div className="bg-sky-900 flex flex-col h-screen">
      <div className="sticky top-0 flex w-full items-center justify-center border border-sky-600 bg-sky-700 text-xl text-zinc-300 h-11">
        Has the Dog Been Fed?
        <button className="bg-green-600" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
      <div className="flex justify-center border border-green-400 h-full">
        <div className="flex flex-col gap-3 bg-sky-900 px-10 max-w-4xl border">
          <div className="flex justify-end p-1 m-2 rounded bg-pink-200">
            {count}
            {am}
          </div>
          <div className="flex justify-between bg-cyan-200 rounded p-2">
            <div className="flex border border-sky-300 rounded p-1 mx-1 items-center justify-between">
              Date Here
            </div>
            <div className="flex justify-center">
              <FormControlLabel
                checked={!isChecked}
                onChange={handleAmOnChange}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: orange[800],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                }
                label="AM"
              />
              <FormControlLabel
                checked={!isPmChecked}
                onChange={handlePmOnChange}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: blue[800],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                }
                label="PM"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-10 bg-sky-800 items-center justify-evenly">
        Footer
      </div>
    </div>
  )
}
