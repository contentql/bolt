import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'

type AvatarCardType = {
  profileUrl: string
  name: string
  href?: string
  description?: string
}

const AvatarCard = ({
  profileUrl,
  name,
  href,
  description,
}: AvatarCardType) => {
  return (
    <div className='flex flex-col items-center gap-12'>
      <Avatar className='size-128'>
        <AvatarImage src={profileUrl} />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>

      <div className='space-y-8 text-center'>
        {href ? (
          <Link
            href={href}
            className='line-clamp-2 text-lg font-semibold transition-colors hover:text-primary'>
            {name}
          </Link>
        ) : (
          <p className='line-clamp-2 text-lg font-semibold'>{name}</p>
        )}

        {description ? (
          <span className='inline-block max-w-lg text-balance text-sm text-secondary'>
            {description}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default AvatarCard
