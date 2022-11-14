import Swal from "sweetalert2"

declare let window: any

export const checkForMetamask = () => {
  if (typeof window.ethereum === "undefined") {
    Swal.fire({
      title: "Metamask not detected",
      text: "Please install Metamask to use this app.",
      icon: "error",
      confirmButtonText: "OK",
    })
    return false
  }
  return true
}
