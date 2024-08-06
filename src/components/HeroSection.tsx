'use client'

import Image from 'next/image'

import Button from './common/Button'
import Container from './common/Container'
import { Input } from './common/Input'

const HeroSection = () => {
  return (
    <Container className='flex flex-col-reverse items-center justify-between gap-24 px-0 md:flex-row'>
      <div className='max-w-lg space-y-12 text-balance'>
        <h1 className='text-lg font-semibold md:text-xl'>Hi there👋</h1>
        <p className='text-secondary md:text-lg'>
          I’m ⚡Bolt. YouTuber, Podcaster, and the author of the New York Times
          bestseller, Feel Good Productivity.
        </p>

        <div className='pt-12'>
          <p className='mb-8 text-sm text-secondary'>
            Subscribe to my newsletter to get latest updates
          </p>
          <form
            className='flex flex-col gap-8 sm:flex-row'
            onSubmit={e => e.preventDefault()}>
            <Input placeholder='Email' type='email' required />
            <Button type='submit'>Subscribe</Button>
          </form>
        </div>
      </div>

      <div className='rounded relative h-320 w-full max-w-lg overflow-hidden bg-secondary sm:h-[52rem]'>
        <Image
          src='https://images.unsplash.com/photo-1655715591331-181a2e687cb9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          className='h-full w-full object-cover object-center'
          fill
          alt='profile-picture'
        />
      </div>
    </Container>
  )
}

export default HeroSection
