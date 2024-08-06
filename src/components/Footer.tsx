import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from './SVG'
import Container from './common/Container'

const Footer = () => {
  return (
    <footer className='bg-card p-12'>
      <Container className='flex flex-col items-center justify-between gap-16 sm:flex-row'>
        <p className='flex-shrink-0 text-center text-sm text-secondary'>
          © ⚡Bolt {new Date().getFullYear()}. All Rights Reserved
        </p>

        <div className='flex w-full items-center justify-between sm:justify-end sm:gap-8'>
          <YoutubeLogo />
          <TwitterLogo className='size-20' />
          <FacebookLogo />
          <LinkedinLogo />
          <InstagramLogo className='size-28' />
        </div>
      </Container>
    </footer>
  )
}

export default Footer
