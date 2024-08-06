'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from './common/Button'
import Container from './common/Container'

const links = [
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'Authors',
    link: '/authors',
  },
  {
    title: 'Tags',
    link: '/tags',
  },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className='fixed top-0 z-10 w-full bg-card'>
      <Container className='flex h-48 items-center justify-between'>
        <Link href='/'>⚡Bolt</Link>

        <ul className='flex items-center gap-16 md:gap-24'>
          {links.map(({ link, title }) => (
            <li key={title}>
              <Link
                data-link-active={pathname.includes(link)}
                href={link}
                className='text-sm text-secondary transition-colors hover:text-text data-[link-active="true"]:text-text'>
                {title}
              </Link>
            </li>
          ))}

          <Link href='/sign-in'>
            <Button size='sm'>Sign in</Button>
          </Link>
        </ul>
      </Container>
    </header>
  )
}

export default Navbar
