import React from "react"
import { SocialLink } from "./SocialLink"
import { BiSupport } from "react-icons/bi"
import { FaDiscord, FaDonate } from "react-icons/fa"
import { RiCodeSSlashFill, RiFilePaperLine } from "react-icons/ri"
import { TOS } from "../tiles/form/TOS"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export const Footer: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="flex h-14 items-center justify-between">
        <SocialLink
          title="Terms of Service"
          icon={<RiFilePaperLine />}
          onClick={() => {
            MySwal.fire({
              html: <TOS />,
              confirmButtonText: "Close",
              confirmButtonColor: "#93c5fd",
            })
          }}
        />
        <SocialLink
          title="Source Code"
          href="https://github.com/geektechniquestudios/Frozr"
          icon={<RiCodeSSlashFill />}
        />
        <SocialLink
          title="Customer Support"
          icon={<BiSupport />}
          onClick={() => {
            MySwal.fire({
              html: <TOS />,
              confirmButtonText: "Close",
              confirmButtonColor: "#93c5fd",
            })
          }}
        />
        <SocialLink
          title="Donate"
          icon={<FaDonate />}
          onClick={() => {
            MySwal.fire({
              html: <TOS />,
              confirmButtonText: "Close",
              confirmButtonColor: "#93c5fd",
            })
          }}
        />
        <SocialLink title="Discord" href="" icon={<FaDiscord />} />
      </div>
    </div>
  )
}
