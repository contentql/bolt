import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'
import { Badge } from './common/Badge'

type BlogCardType = {
  title: string
  description: string
  poster: string
  publishedOn: Date
  user: {
    name: string
    profile: string
  }
}

const BlogCard = ({ details }: { details: BlogCardType }) => {
  return (
    <div className='space-y-16'>
      <div className='relative h-256 w-full overflow-hidden rounded bg-secondary'>
        <Image
          src={details.poster}
          fill
          alt='blog image'
          className='object-cover'
          priority
          sizes='400px'
        />
      </div>

      <div className='flex flex-col gap-12 md:self-center'>
        <Link
          href='/blog'
          className='line-clamp-2 text-lg font-semibold transition-colors hover:text-primary'>
          {details.title}
        </Link>

        <p className='line-clamp-3 text-secondary'>{details.description}</p>

        <div className='flex flex-wrap gap-8'>
          <Badge>Content Creation</Badge>
          <Badge variant='danger'>Content Creation</Badge>
          <Badge variant='gray'>Content</Badge>
          <Badge variant='info'>Content Creation</Badge>
          <Badge variant='success'>Content Creation</Badge>
          <Badge variant='warning'>Content Creation</Badge>
        </div>

        <div className='flex items-center gap-12'>
          <Avatar>
            <AvatarImage src={details.user.profile} />
            <AvatarFallback className='text-sm'>CN</AvatarFallback>
          </Avatar>

          <div className='flex flex-col gap-4'>
            <span className='text-sm'>{details.user.name}</span>
            <span className='text-sm text-secondary'>
              {format(new Date(), 'LLL io, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
