import { useEffect, useState } from "react"
import { firebaseApp } from "../../config"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { blue, green, orange } from "@mui/material/colors"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export const MainContent: React.FC = () => {
  const [am, setAm] = useState(false)
  const [pm, setPm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const daysColRef = collection(db, "days")
  const dayDocRef = doc(daysColRef, "day")

  const storeAmInFirestore = (am: Boolean) => {
    updateDoc(dayDocRef, { am })
  }

  const storePmInFirestore = (pm: Boolean) => {
    updateDoc(dayDocRef, { pm })
  }

  useEffect(() => {
    getDoc(dayDocRef)
      .then(doc => {
        setAm(doc.data()?.am)
        setPm(doc.data()?.pm)
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  const handleAmOnChange = () => {
    storeAmInFirestore(!am)
    setAm(!am)
  }
  const handlePmOnChange = () => {
    storePmInFirestore(!pm)
    setPm(!pm)
  }

  return (
    <div className="flex h-full justify-center border border-green-400">
      <div className="flex max-w-4xl flex-col gap-3 border bg-sky-900 px-10">
        <div className="flex justify-between  rounded bg-cyan-200 p-2">
          <div className="mx-1 flex items-center justify-between rounded border border-sky-300 p-1">
            Date Here
          </div>
          {isLoading && <div className="w-22">Loading...</div>}
          {!isLoading && (
            <div className="flex justify-center">
              <FormControlLabel
                checked={am}
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
                checked={pm}
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
          )}{" "}
        </div>
      </div>
    </div>
  )
}
