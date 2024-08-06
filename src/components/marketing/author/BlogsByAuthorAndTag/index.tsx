import { Blog, User } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

function AuthorPostsView({
  blogsData,
  author,
}: {
  blogsData: Blog[]
  author: User
}) {
  const tabs = [
    {
      title: 'Author Details',
      id: 'author',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: author,
    },
    {
      title: 'Blogs',
      id: 'blogs',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogsData,
    },
  ]
  return (
    <div className='mx-auto max-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <p className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          Get Started with src/app/(app)/(marketing)/author/[authorName]
        </p>
        <Link
          href={`/author`}
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          Back
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default AuthorPostsView
