interface Props {}

export const FluffTile: React.FC<Props> = ({}) => {
  return (
    <div
      className="grid h-[40em] shrink-0 grid-cols-6 gap-4 rounded-md border border-stone-600 bg-slate-400 bg-opacity-20 text-slate-200"
      style={{
        backdropFilter: "blur(16px)",
      }}
    >
      {/* I'll pitch stuff here
      -decentralized
      -free
      -open source
      -no ads
      -no tracking
      -no data collection
      -view contract on blockchain */}

      <div className="col-span-4 col-start-2 border p-2">
        <p className="text-xl">Fully Decentralized</p>
        <p className="text-sm">
          A trustless system holds your funds. Your money is kept in a protocol
          running on the blockchain of your coin, not with an individual or
          business.
        </p>
      </div>
      <div className="col-start-1 col-end-3 border p-2">
        <p className="text-xl">Entierly Open Source</p>
        <p className="text-sm">
          A trustless system holds your funds. Your money is kept in a protocol
          running on the blockchain of your coin, not with an individual or
          business.
        </p>
      </div>
      <div className="col-span-2 col-start-3 border p-2">
        <p className="text-xl">No Ads</p>
        <p className="text-sm">
          A trustless system holds your funds. Your money is kept in a protocol
          running on the blockchain of your coin, not with an individual or
          business.
        </p>
      </div>
      <div className="col-span-2 col-end-7 border p-2">
        <p className="text-xl">No Data Collection</p>
        <p className="text-sm">
          A trustless system holds your funds. Your money is kept in a protocol
          running on the blockchain of your coin, not with an individual or
          business.
        </p>
      </div>
      <div className="col-start-1 col-end-7 border p-2">04</div>
    </div>
  )
}
