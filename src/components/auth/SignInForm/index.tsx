'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { Input } from '@/components/common/Input'

import { signInWithCredentials } from './actions'

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

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
        console.log({ result })

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
        {backendLoginResponse &&
        'error' in backendLoginResponse &&
        backendLoginResponse?.error?.code === 'credentials' ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>
              Sign in failed. Check the details you provided are incorrect.
            </AlertDescription>
          </Alert>
        ) : null}

        {backendLoginResponse && backendLoginResponse?.success === true ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Successfully logged in! Redirecting...
            </AlertDescription>
          </Alert>
        ) : null}

        <h1 className='mb-12 text-lg font-semibold md:text-xl'>Sign In</h1>

        <p className='text-secondary'>
          Join to Our Community with all time access and free{' '}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-20 space-y-20 text-sm'>
          <div className='space-y-4'>
            <label htmlFor='email'>Email</label>

            <Input
              {...register('email')}
              type='text'
              id='email'
              name='email'
              placeholder='john.doe@example.com'
            />
            <p className='text-danger'>{errors?.email?.message || ' '}</p>
          </div>

          <div className='space-y-4'>
            <label htmlFor='password'>Password</label>

            <Input
              {...register('password')}
              type='password'
              id='password'
              name='password'
            />

            <p className='text-danger'>{errors?.password?.message || ' '}</p>
          </div>

          <Link
            className='text-primary hover:text-primary/90'
            href='/reset-password'>
            Forgot password
          </Link>

          <Button type='submit' disabled={isPending} className='w-full'>
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className='text-center text-sm text-secondary'>
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-primary hover:text-primary/90'>
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </Container>
  )
}

export default SignInForm
