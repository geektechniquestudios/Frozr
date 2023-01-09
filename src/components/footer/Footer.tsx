import React from "react"
import { SocialLink } from "./SocialLink"
import { BiSupport } from "react-icons/bi"
import { FaDiscord, FaDonate } from "react-icons/fa"
import { RiCodeSSlashFill, RiFilePaperLine } from "react-icons/ri"
import { TOS } from "../popups/TOS"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Donate } from "../popups/Donate"
import { CustomerSupport as Support } from "../popups/Support"
import { motion } from "framer-motion"

const MySwal = withReactContent(Swal)

interface Props {}

export const Footer: React.FC<Props> = ({}) => {
  return (
    <motion.div className="flex h-full flex-col justify-end">
      <div className="flex h-14 items-center justify-between">
        <SocialLink
          title="Terms of Service"
          icon={<RiFilePaperLine />}
          onClick={() => {
            MySwal.fire({
              html: <TOS />,
              confirmButtonText: "Close",
              confirmButtonColor: "#0369a1",
            })
          }}
        />
        <SocialLink
          title="Source Code"
          href="https://github.com/geektechniquestudios/Frozr"
          icon={<RiCodeSSlashFill />}
        />
        <SocialLink
          title="Contact"
          icon={<BiSupport />}
          onClick={() => {
            MySwal.fire({
              html: <Support />,
              icon: "warning",
              confirmButtonText: "Close",
              confirmButtonColor: "#0369a1",
            })
          }}
        />
        <SocialLink
          title="Donate"
          icon={<FaDonate />}
          onClick={() => {
            MySwal.fire({
              html: <Donate />,
              icon: "info",
              confirmButtonText: "Close",
              confirmButtonColor: "#0369a1",
            })
          }}
        />
        <SocialLink
          title="Discord"
          href="https://discord.gg/ySpQCFdcR2"
          icon={<FaDiscord />}
        />
      </div>
    </motion.div>
  )
}
