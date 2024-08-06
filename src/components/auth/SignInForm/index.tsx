'use client'

import { BottomGradient, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ComponentProps, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { z } from 'zod'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { Input } from '@/components/common/Input'

import { signInWithCredentials } from './actions'

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail is required' })
    .email({ message: 'E-mail is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

const Separator = ({ children }: ComponentProps<'div'>) => (
  <div className='my-3 relative isolate flex items-center justify-center'>
    <p className='bg-white text-zinc-500 dark:bg-zinc-900 p-2 text-sm font-medium uppercase'>
      {children}
    </p>
    <hr className='bg-zinc-200 p-px dark:bg-zinc-600 absolute z-[-1] w-full border-0' />
  </div>
)

const SignInForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [backendLoginResponse, setBackendLoginResponse] = useState<Awaited<
    ReturnType<typeof signInWithCredentials>
  > | null>(null)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form

  const [email, password] = watch(['email', 'password'])

  useEffect(() => {
    if (backendLoginResponse && backendLoginResponse.success === false) {
      setBackendLoginResponse(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    startTransition(() => {
      signInWithCredentials({ ...data, redirectTo: '/' }).then(result => {
        if (!result) return
        if (result.success === true) {
          router.push('/')
        }
        if ('error' in result) {
          setBackendLoginResponse(result)
        }
      })
    })
  }

  return (
    <Container className='grid items-center'>
      <Container className='max-w-lg'>
        {backendLoginResponse && 'error' in backendLoginResponse ? (
          <p className='text-red-500 text-center'>
            {backendLoginResponse?.error?.code === 'credentials' &&
              'Sign in failed. Check the details you provided are incorrect.'}
          </p>
        ) : null}
        {backendLoginResponse && backendLoginResponse?.success === true ? (
          <p className='text-green-500 text-center'>
            Successfully logged in! Redirecting...
          </p>
        ) : null}

        <h1 className='mb-6 text-3xl text-white text-center font-semibold'>
          Sign In
        </h1>
        <h1 className='mb-6 text-gray-300 text-center text-sm font-semibold'>
          Join to Our Community with all time access and free{' '}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <LabelInputContainer className='mb-4'>
              <div className='inline-flex justify-between'>
                <label
                  htmlFor='email'
                  className='text-gray-300 block text-sm font-medium'>
                  E-Mail
                </label>
                {errors?.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>
              <Input
                {...register('email')}
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
              />
            </LabelInputContainer>
          </div>

          <div>
            <LabelInputContainer className='mb-8'>
              <div className='inline-flex justify-between'>
                <label
                  htmlFor='password'
                  className='text-gray-300 block text-sm font-medium'>
                  Password
                </label>
                {errors?.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Input
                {...register('password')}
                type='password'
                id='password'
                name='password'
              />
            </LabelInputContainer>
          </div>

          <p className='text-gray-700 dark:text-gray-300 text-sm'>
            Forgot your password?{' '}
            <Link className='underline' href='/reset-password'>
              Reset it.
            </Link>
          </p>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className='mt-4 flex flex-col space-y-4'>
          <button
            className=' group/btn h-10 bg-gray-50 text-black dark:bg-zinc-900 relative flex w-full items-center justify-start space-x-2 rounded-md px-4 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            <FaGithub className='text-neutral-800 dark:text-neutral-300 h-4 w-4' />
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              GitHub
            </span>
            <BottomGradient />
          </button>

          <button
            className=' group/btn h-10 bg-gray-50 text-black dark:bg-zinc-900 relative flex w-full items-center justify-start space-x-2 rounded-md px-4 font-medium shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            <FaGithub className='text-neutral-800 dark:text-neutral-300 h-4 w-4' />
            <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
              Google
            </span>
            <BottomGradient />
          </button>
        </div>

        <div className='text-sm text-secondary'>
          <p>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='text-primary'>
              SignUp here
            </Link>
          </p>
        </div>
      </Container>
    </Container>
  )
}

export default SignInForm
