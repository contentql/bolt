import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from '@/components/SVG'

import Button from './common/Button'
import Container from './common/Container'

const SocialLinks = () => {
  return (
    <Container className='flex flex-wrap items-center justify-center gap-12'>
      <Button variant='secondary' className='items-center gap-8'>
        <TwitterLogo />
        Bolt
      </Button>

      <Button variant='secondary' className='items-center gap-8'>
        <InstagramLogo />
        Bolt
      </Button>

      <Button variant='secondary' className='items-center gap-8'>
        <YoutubeLogo />
        Bolt
      </Button>

      <Button variant='secondary' className='items-center gap-8'>
        <LinkedinLogo />
        Bolt
      </Button>

      <Button variant='secondary' className='items-center gap-8'>
        <FacebookLogo />
        Bolt
      </Button>
    </Container>
  )
}

export default SocialLinks
