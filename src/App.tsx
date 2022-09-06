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

export const App: React.FC = () => {
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

  const [isChecked, setIsChecked] = useState(false)
  const [isPmChecked, setIsPmChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
    storeCountInFirestore(count + 1)
    setCount(count + 1)
  }
  const handlePmOnChange = () => {
    setIsPmChecked(!isPmChecked)
    storeCountInFirestore(count - 1)
    setCount(count - 1)
  }

  return (
    <div className="bg-slate-300 flex w-full items-center justify-center">
      <div className="flex max-w-4xl grow flex-col gap-3 bg-zinc-400 px-10">
        <div className="sticky top-0 flex w-full items-center justify-center border-b border-zinc-600 bg-zinc-800 text-xl text-zinc-300 h-11">
          Has the Dog Been Fed?
        </div>
        <div className="flex justify-center bg-blue-300">
          <div className="flex max-w-4xl grow flex-col gap-3 bg-zinc-400 px-10">
            <div className="bg-gray-300 rounded p-1">
              <div className="flex justify-end m-2 rounded bg-pink-300">
                {count}
              </div>
            </div>
            <div className="flex justify-between bg-purple-300 rounded p-3">
              <div>Date Here</div>
              <div>
                <input
                  type="checkbox"
                  checked={!isChecked}
                  onChange={handleOnChange}
                />
                <button
                  className="bg-red-200 rounded"
                  onClick={() => {
                    storeCountInFirestore(count + 1)
                    setCount(count + 1)
                  }}
                >
                  + AM
                </button>
                <input
                  type="checkbox"
                  checked={!isPmChecked}
                  onChange={handlePmOnChange}
                />
                <button
                  className="bg-green-800 rounded"
                  onClick={() => {
                    storeCountInFirestore(count - 1)
                    setCount(count - 1)
                  }}
                >
                  - PM
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex h-10 bg-amber-100 items-center justify-evenly">
          Footer
        </div>
      </div>
    </div>
  )
}
