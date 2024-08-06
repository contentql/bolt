// import AuthorsListView from '@/components/marketing/author'
// import { serverClient } from '@/trpc/serverClient'
import AvatarCard from '@/components/AvatarCard'
import Container from '@/components/common/Container'

const list = [
  {
    user: {
      name: 'Bolt',
      profile:
        'https://images.unsplash.com/photo-1655715591331-181a2e687cb9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  },
  {
    user: {
      name: 'Jasmine',
      profile:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    user: {
      name: 'Brook',
      profile:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
]

const page = async () => {
  // const authors = await serverClient.author.getAllAuthorsWithCount()
  // return <AuthorsListView authors={authors as any} />
  return (
    <Container>
      <h1 className='mb-12 text-lg font-semibold md:text-xl'>
        Meet our authors
      </h1>
      <p className='mb-60 text-balance text-secondary md:mb-128 md:text-lg'>
        Introducing the creative minds behind our content, the storytellers and
        experts who make our content shine
      </p>

      <Container className='flex w-full max-w-2xl flex-wrap justify-between gap-16'>
        {list.map(details => (
          <AvatarCard
            name={details.user.name}
            profileUrl={details.user.profile}
            href='/authors/bolt'
            description='Posts 6'
            key={details.user.name}
          />
        ))}
      </Container>
    </Container>
  )
}

export default page
