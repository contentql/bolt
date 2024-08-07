'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'

import { cn } from '@/utils/cn'

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
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className='fixed top-0 z-10 w-full bg-card'>
      <Container className='flex h-48 items-center justify-between'>
        <Link href='/'>⚡Bolt</Link>

        <div
          className={`transition-[visibility] ${open ? 'visible' : 'invisible duration-500'}`}>
          <nav
            className={`fixed right-0 top-48 z-10 h-[calc(100vh-4.8rem)] w-full transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} sm:max-w-sm md:visible md:static md:h-max md:w-max md:-translate-x-0`}>
            <ul
              className={cn(
                `flex h-full w-full flex-col gap-16 bg-card px-16 pt-16 md:flex-row md:items-center md:gap-24 md:p-0`,
              )}>
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
                <Button size='sm' className='w-full'>
                  Sign in
                </Button>
              </Link>
            </ul>
          </nav>
        </div>

        <HiMenu
          className='cursor-pointer text-lg text-secondary md:hidden'
          onClick={() => setOpen(current => !current)}
        />
      </Container>
    </header>
  )
}

export default Navbar
