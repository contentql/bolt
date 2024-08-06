import { Blog } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

const BlogPostsView = ({ blogs }: { blogs: Blog[] }) => {
  const tabs = [
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
          Get Started with src/app/(app)/(marketing)/blog
        </p>
        <Link
          href={`/blog/${blogs?.at(0)?.slug!}`}
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          view blog post
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default BlogPostsView
