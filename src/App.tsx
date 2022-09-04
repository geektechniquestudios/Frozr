import { useEffect, useState } from "react"
import { firebaseApp } from "../config"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export const App = () => {
  const [count, setCount] = useState(0)
  const countCollectionRef = collection(db, "count")
  const countDocRef = doc(countCollectionRef, "counter")

  const storeCountInFirestore = (count: Number) => {
    setDoc(countDocRef, { value: count })
  }

  useEffect(() => {
    getDoc(countDocRef).then(doc => {
      setCount(doc.data()?.value)
    })
  }, [])

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          storeCountInFirestore(count + 1)
          setCount(count + 1)
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          storeCountInFirestore(count - 1)
          setCount(count - 1)
        }}
      >
        -
      </button>
    </div>
  )
}
