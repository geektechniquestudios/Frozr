import { default as vault } from "/src/assets/undraw_vault.svg"

export const HeadingTile = () => {
  return (
    <div
      className="flex flex-col items-center rounded-md border border-slate-500 bg-slate-400 bg-opacity-40 p-4 sm:flex-row "
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex h-32 shrink justify-start text-stone-300 sm:w-1/2">
        <img src={vault} alt="vault" />
      </div>
      <p className="m-3 border-l border-slate-400 pl-2 text-2xl font-bold text-stone-200 sm:w-1/2">
        Lock your cyptocurrency in a timed smart-contract vault for free
      </p>
    </div>
  )
}
