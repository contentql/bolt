'use client'

import { Blog } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

const BlogPostView = ({
  blog,
  blogsData,
  decodedSlug,
}: {
  blog: Blog
  blogsData: Blog[]
  decodedSlug: string
}) => {
  const tabs = [
    {
      title: 'Blog Data',
      id: 'BlogData',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blog,
    },
    {
      title: 'Blogs Data',
      id: 'BlogsData',
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
          Get Started with src/app/(app)/(marketing)/blog/[blogSlug]
        </p>
        <Link
          href='/blog'
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          back
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default BlogPostView
