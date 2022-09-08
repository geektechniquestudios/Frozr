import { useEffect, useState } from "react"
import { firebaseApp } from "../config"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import * as React from "react"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import { blue, green, orange } from "@mui/material/colors"

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
    <div className="bg-sky-900 h-screen">
      <div className="sticky top-0 flex w-full items-center justify-center border border-sky-600 bg-sky-700 text-xl text-zinc-300 h-11">
        Has the Dog Been Fed?
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-4xl grow flex-col gap-3 bg-sky-900 px-10">
          <div className="flex justify-end p-1 m-2 rounded bg-pink-200">
            {count}
          </div>
          <div className="flex justify-between bg-cyan-200 rounded p-2">
            <div className="flex border border-sky-300 rounded p-1 mx-1 items-center justify-center">
              Date Here
            </div>
            <div className="flex justify-center">
              <FormControlLabel
                checked={!isChecked}
                onChange={handleOnChange}
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
      <div className="mt-3 flex h-10 bg-sky-800 items-center justify-evenly">
        Footer
      </div>
    </div>
  )
}
