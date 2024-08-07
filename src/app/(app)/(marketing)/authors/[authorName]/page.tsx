// import { User } from '@payload-types'
import AvatarCard from '@/components/AvatarCard'
import BlogSection from '@/components/BlogSection'
import SocialLinks from '@/components/SocialLinks'
import Container from '@/components/common/Container'

// import AuthorPostsView from '@/components/marketing/author/BlogsByAuthorAndTag'
// import { serverClient } from '@/trpc/serverClient'

// interface PageProps {
//   params: {
//     authorName: string
//   }
//   searchParams: {
//     tag: string
//   }
// }

// const Author = async ({ params, searchParams }: PageProps) => {
//   const author = await serverClient.author.getAuthorByName({
//     authorName: params?.authorName,
//   })
//   const authorBlogs = await serverClient.author.getBlogsByAuthorName({
//     authorName: params?.authorName,
//   })
//   return <AuthorPostsView author={author as User} blogsData={authorBlogs} />
// }

const Author = async () => {
  return (
    <Container className='flex w-full flex-col items-center space-y-60'>
      <div className='space-y-16'>
        <AvatarCard
          name='Bolt'
          profileUrl='https://images.unsplash.com/photo-1655715591331-181a2e687cb9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          description='Bolt is a talented writer whose work has gained recognition from both critics and readers.'
        />

        <SocialLinks />
      </div>

      <BlogSection />
    </Container>
  )
}

export default Author
