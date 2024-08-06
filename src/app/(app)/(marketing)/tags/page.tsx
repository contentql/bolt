// import TagListView from '@/components/marketing/tag'
// import { serverClient } from '@/trpc/serverClient'
import AvatarCard from '@/components/AvatarCard'
import Container from '@/components/common/Container'

const list = [
  {
    name: 'Content Creation',
    profile:
      'https://images.unsplash.com/photo-1519458246479-6acae7536988?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Technology',
    profile:
      'https://images.unsplash.com/photo-1722440814495-3d2d3107a7de?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Inspiration',
    profile:
      'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const page = async () => {
  // const tags = await serverClient.tag.getAllTags()
  // return <TagListView tags={tags} />
  return (
    <Container>
      <h1 className='mb-12 text-lg font-semibold md:text-xl'>
        Explore our topics
      </h1>
      <p className='mb-60 text-balance text-secondary md:mb-128 md:text-lg'>
        Explore popular topics that shape our content, dive in and discover a
        world of inspiration, knowledge, and connection
      </p>

      <Container className='flex w-full max-w-2xl flex-wrap justify-between gap-16'>
        {list.map(details => (
          <AvatarCard
            name={details.name}
            profileUrl={details.profile}
            href='/tags/bolt'
            description='Posts 6'
            key={details.name}
          />
        ))}
      </Container>
    </Container>
  )
}

export default page
