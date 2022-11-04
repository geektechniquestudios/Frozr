import React from "react"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className="mx-1 flex h-full items-center justify-start gap-1.5 align-middle">
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className="mx-1 h-9 translate-y-0.5"
        />
        <p className="mx-3 text-2xl font-extrabold ">Frozr</p>
      </div>
    </div>
  )
}
