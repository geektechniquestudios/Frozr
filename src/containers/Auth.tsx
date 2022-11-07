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
import { ethers } from "ethers"
import { useState } from "react"

const db = getFirestore(firebaseApp)

declare let window: any

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
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") !== null
      ? localStorage.getItem("walletAddress")
      : "",
  )
  const [isWalletConnected, setIsWalletConnected] = useState(
    localStorage.getItem("isWalletConnected") !== null
      ? localStorage.getItem("isWalletConnected")! === "true"
      : false,
  )

  const [isWalletConnecting, setIsWalletConnecting] = useState(false)

  const connectWallet = async () => {
    // if (!user) {
    //   signInWithGoogle()
    //   return
    // }
    if (typeof window.ethereum === undefined) {
      alert("Metamask not installed")
      return
    }
    try {
      setIsWalletConnecting(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const walletAddress = await signer.getAddress()
      // const userDoc = doc(db, "users", auth.currentUser!.uid)
      // updateDoc(userDoc, {
      //   walletAddress,
      // })
      //   .then(() => {
      setIsWalletConnected(true)
      setIsWalletConnecting(false)
      setWalletAddress(walletAddress)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("isWalletConnected", "true")
      // })
      // .then(() => {
      //   alert("Wallet connected")
      // })
      // .catch((error) => {
      //   console.error(error)
      //   alert("Error connecting to wallet")
      //   setIsWalletConnected(false)
      // })
    } catch (error) {
      console.error(error)
      alert("Error connecting to wallet.")
      setIsWalletConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    // if (!auth.currentUser) return
    // const userDoc = doc(db, "users", auth.currentUser!.uid)
    // updateDoc(userDoc, {
    // walletAddress: "",
    // })
    // .then(() => {
    setWalletAddress("")
    setIsWalletConnected(false)
    localStorage.setItem("walletAddress", "")
    localStorage.setItem("isWalletConnected", "false")
    // })
    // .catch(() => {
    // alert("Error disconnecting wallet")
    // })
  }

  return {
    auth,
    user,
    signInWithGoogle,
    signOutWithGoogle,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    setIsWalletConnected,
    isWalletConnecting,
    walletAddress,
  }
}

export const Auth = createContainer(useAuth)
