import { Skeleton } from './common/Skeleton'

// import { Blog } from '@payload-types'
// import BlogCard from './BlogCard'

const list = [
  {
    title: 'The Art of Storytelling',
    description:
      'Explore how storytelling has evolved with the rise of digital media. Discuss techniques for crafting compelling narratives across various platforms, including podcasts, blogs, and social media. Offer tips on engaging audiences through authentic and relatable stories.',
    poster:
      'https://images.unsplash.com/photo-1647529734603-b7ddcac3dc71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedOn: new Date(),
    user: {
      name: 'Bolt',
      profile:
        'https://images.unsplash.com/photo-1655715591331-181a2e687cb9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  },
  {
    title: 'Mastering Time Management for Content Creators',
    description:
      'Provide practical strategies for balancing content creation, promotion, and personal life. Share productivity hacks, tools, and techniques specifically tailored for busy content creators. Include real-life examples and case studies of successful creators who effectively manage their time.',
    poster:
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedOn: new Date(),
    user: {
      name: 'Jasmine',
      profile:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    title:
      'The Science of Viral Content: What Makes Things Spread Faster and Better',
    description:
      'Analyze the psychological and social factors that contribute to content going viral. Examine successful viral campaigns across different platforms and break down the elements that made them shareable. Offer actionable tips for creating content with higher potential for virality.',
    poster:
      'https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedOn: new Date(),
    user: {
      name: 'Brook',
      profile:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
]

const BlogSection = () => {
  return (
    <div className='w-full'>
      <h3 className='mb-16 text-secondary'>Featured Posts</h3>
      <div className='grid gap-52 sm:gap-x-24 md:grid-cols-2 lg:grid-cols-3'>
        {list.map(details => (
          // <BlogCard details={details} key={details.title} />
          <div className='grid  w-full space-y-12' key={details.title}>
            <Skeleton className='h-256 w-full' />
            <div className='space-y-12'>
              <Skeleton className='h-16 w-[250px]' />
              <Skeleton className='h-16 w-[200px]' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogSection
