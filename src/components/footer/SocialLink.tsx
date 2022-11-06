type Props = {
  href: string
  icon: React.ReactNode
}

export const SocialLink: React.FC<Props> = ({ href, icon }) => {
  return (
    <a
      className="grid h-8 w-8 place-content-center rounded-full border border-gray-600 text-zinc-200 hover:border-gray-400"
      href={href}
    >
      {icon}
    </a>
  )
}
