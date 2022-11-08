import { default as logo } from "/src/assets/logo.png"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className=" flex h-full items-center justify-start gap-1.5 align-middle">
        <img src={logo} alt="logo" className="h-8" />
        <p className="mx-3 text-2xl font-extrabold ">Frozr</p>
      </div>
    </div>
  )
}
