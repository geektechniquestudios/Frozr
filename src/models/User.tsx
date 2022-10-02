import { Timestamp } from "firebase/firestore"

export type User = {
    am?: boolean
    pm?: boolean
    displayName: string
    families: string[]
    joinDate: Timestamp
    photoUrl: string
}