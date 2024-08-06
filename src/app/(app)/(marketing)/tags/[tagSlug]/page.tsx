// import TagBlogListView from '@/components/marketing/tag/BlogsByTag'
// import { serverClient } from '@/trpc/serverClient'
import AvatarCard from '@/components/AvatarCard'
import BlogSection from '@/components/BlogSection'
import Container from '@/components/common/Container'

interface PageProps {
  params: {
    tagSlug: string
  }
}

// const page = async ({ params }: PageProps) => {
//   try {
//     const blogs = await serverClient.tag.getBlogs({ tagSlug: params?.tagSlug })

//     return (
//       <TagBlogListView
//         blogs={blogs?.blogsData}
//         tagDetails={blogs?.tagData?.at(0)}
//       />
//     )
//   } catch (error) {
//     console.error('Error fetching blogs:', error)
//   }
// }

const page = async ({ params }: PageProps) => {
  return (
    <Container className='flex w-full flex-col items-center space-y-60'>
      <AvatarCard
        name='Inspiration'
        profileUrl='https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        description='Explore inspirations to create your unique way of life. A source of ideas for fashion, travel, health, and personal development, helping you shape a distinctive lifestyle that aligns with your preferences and choices.'
      />

      <BlogSection />
    </Container>
  )
}

export default page
