export const HeadingBlurb = () => {
  return (
    <div
      className="flex rounded-md bg-slate-400 p-4 bg-opacity-40"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex justify-start text-stone-300 w-1/2">
        <img src="./src/assets/undraw_vault.svg" alt="vault" />
      </div>
      <p className="m-3 border-l pl-2 text-2xl font-bold text-stone-200 border-slate-400 w-1/2">
        Lock your cypto in a smart-contract timed vault for free
      </p>
    </div>
  )
}
