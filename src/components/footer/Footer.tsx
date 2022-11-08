import React from "react"
import { BsGithub } from "react-icons/bs"
import { SocialLink } from "./SocialLink"
import { MdOutlineMail } from "react-icons/md"
import { BiSupport } from "react-icons/bi"
import { FaDonate } from "react-icons/fa"
import { RiCodeSSlashFill, RiFilePaperLine } from "react-icons/ri"

export const Footer: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="flex h-14 items-center justify-between">
        <SocialLink
          title="Terms of Service"
          href="https://www.linkedin.com/in/terry-dorsey-0a51b5187/"
          icon={<RiFilePaperLine />}
        />
        <SocialLink
          title="Source Code"
          href="https://github.com/geektechniquestudios"
          icon={<RiCodeSSlashFill />}
        />
        <SocialLink
          title="Customer Support"
          href="https://stackoverflow.com/users/9634620/geektechnique"
          icon={<BiSupport />}
        />
        <SocialLink
          title="Donate"
          href="https://www.youtube.com/channel/UCiKB8a8J0PXB67s_P-jXuJQ?view_as=subscriber"
          icon={<FaDonate />}
        />
      </div>
    </div>
  )
}
