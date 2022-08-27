import { useState } from "react"
import "./App.css"
import { firebaseApp } from "../config"
import { getFirestore } from "firebase/firestore"

const db = getFirestore(firebaseApp)

export const App = () => {
  const [count, setCount] = useState(0)

  const storeCountInFirebase = (count: Number) => {}

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1)
          storeCountInFirebase(count)
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1)
          storeCountInFirebase(count)
        }}
      >
        -
      </button>
    </div>
  )
}
