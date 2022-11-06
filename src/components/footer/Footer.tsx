import React from "react"
import {
  BsGithub,
  BsStackOverflow,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs"
import { SocialLink } from "./SocialLink"

export const Footer: React.FC = () => {
  return (
    <div className="flex h-14 items-center justify-evenly py-2">
      <SocialLink
        href="https://www.linkedin.com/in/terry-dorsey-0a51b5187/"
        icon={<BsLinkedin />}
      />
      <SocialLink
        href="https://github.com/geektechniquestudios"
        icon={<BsGithub />}
      />
      <SocialLink
        href="https://stackoverflow.com/users/9634620/geektechnique"
        icon={<BsStackOverflow />}
      />
      <SocialLink
        href="https://www.youtube.com/channel/UCiKB8a8J0PXB67s_P-jXuJQ?view_as=subscriber"
        icon={<BsYoutube />}
      />
    </div>
  )
}
