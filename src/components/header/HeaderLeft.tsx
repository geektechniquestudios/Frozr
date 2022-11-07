import React from "react"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className=" flex h-full items-center justify-start gap-1.5 align-middle">
        <img src="./src/assets/logo2.png" alt="logo" className="h-8" />
        <p className="mx-3 text-2xl font-extrabold ">Frozr</p>
      </div>
    </div>
  )
}
