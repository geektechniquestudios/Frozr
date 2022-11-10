import { default as vault } from "/src/assets/undraw_vault.svg"

export const HeadingTile = () => {
  return (
    <div
      className="flex rounded-md border border-slate-500 bg-slate-400 bg-opacity-40 p-4"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex h-36 w-1/2 shrink justify-start text-stone-300">
        <img src={vault} alt="vault" />
      </div>
      <p className="m-3 w-1/2 border-l border-slate-400 pl-2 text-2xl font-bold text-stone-200">
        Lock your cyptocurrency in a smart-contract timed vault for free
      </p>
    </div>
  )
}
