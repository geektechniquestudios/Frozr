interface Props {}

export const CustomerSupport: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl">Contact Us</p>
      <div className="text-sm">
        If you have any questions or concerns, please don't hesitate to open an
        issue on{" "}
        <a
          className="underline underline-offset-2"
          href="https://github.com/geektechniquestudios/Frozr"
        >
          github
        </a>
        , or reach out at out at{" "}
        <button
          className="underline underline-offset-2"
          onClick={() => {
            window.open(
              "mailto:email@geektechniquestudios@gmail.com?subject=Frozr",
            )
          }}
        >
          geektechniquestudios@gmail.com
        </button>
      </div>
    </div>
  )
}
