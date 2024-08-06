import BlogSection from '@/components/BlogSection'
import HeroSection from '@/components/HeroSection'
import Container from '@/components/common/Container'

const Page = async () => {
  return (
    <Container className='space-y-60 md:space-y-128'>
      <HeroSection />
      <BlogSection />
    </Container>
  )
}

export default Page
