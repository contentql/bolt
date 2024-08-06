import { Blog } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

function TagBlogListView({
  tagDetails,
  blogs,
}: {
  tagDetails: any
  blogs: Blog[]
}) {
  const tabs = [
    {
      title: 'Tag Details',
      id: 'TagDetails',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: tagDetails,
    },
    {
      title: 'Blogs Data',
      id: 'BlogsData',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogs,
    },
  ]

  return (
    <div className='mx-auto max-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <p className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          Get Started with src/app/(app)/(marketing)/tag/[tagSlug]
        </p>
        <Link
          href='/tag'
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          back
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default TagBlogListView
