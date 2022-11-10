interface Props {}

export const Donate: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl">Donate</p>
      <p className="text-sm">
        This webservice is provided entirely free of charge. If this you used
        this service and found it useful, please consider donating to support
        the creators.
      </p>
    </div>
  )
}
