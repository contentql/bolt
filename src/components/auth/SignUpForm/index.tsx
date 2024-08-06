'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { Input } from '@/components/common/Input'

import { signUp } from './actions'

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export type SignUpFormData = z.infer<typeof signUpFormSchema>

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition()
  const [backendSignUpResponse, setBackendSignUpResponse] = useState<any>(null)

  const router = useRouter()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
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

  const [firstName, lastName, email, password] = watch([
    'firstName',
    'lastName',
    'email',
    'password',
  ])

  useEffect(() => {
    if (backendSignUpResponse) {
      setBackendSignUpResponse(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, password])

  const onSubmit = async (data: SignUpFormData) => {
    startTransition(async () => {
      const result = await signUp({ ...data, redirectTo: '/profile' })
      setBackendSignUpResponse(result)
      if (result.success) {
        router.push('/profile')
      }
    })
  }

  return (
    <Container className='grid items-center'>
      <Container className='max-w-lg'>
        {backendSignUpResponse &&
        !backendSignUpResponse?.success &&
        backendSignUpResponse?.error ? (
          <p color='red'>{backendSignUpResponse.error.message}</p>
        ) : null}
        {backendSignUpResponse && backendSignUpResponse?.success ? (
          <p color='green'>Account created! Redirecting...</p>
        ) : null}

        <h1 className='mb-12 text-lg font-semibold md:text-xl'>Sign Up</h1>

        <p className='text-secondary'>
          Join to Our Community with all time access and free{' '}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-20 space-y-20 text-sm'>
          <div className='space-y-4'>
            <label htmlFor='firstName'>First Name</label>

            <Input
              {...register('firstName')}
              type='text'
              id='firstName'
              name='firstName'
              placeholder='John'
            />
            <p className='text-sm text-danger'>
              {errors?.firstName?.message || ' '}
            </p>
          </div>

          <div className='space-y-4'>
            <label htmlFor='lastName'>Last Name</label>

            <Input
              {...register('lastName')}
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Doe'
            />
            <p className='text-sm text-danger'>
              {errors?.lastName?.message || ' '}
            </p>
          </div>

          <div className='space-y-4'>
            <label htmlFor='email'>Email</label>

            <Input
              {...register('email')}
              type='text'
              id='email'
              name='email'
              placeholder='john.doe@example.com'
            />
            <p className='text-sm text-danger'>
              {errors?.email?.message || ' '}
            </p>
          </div>

          <div className='space-y-4'>
            <label htmlFor='password'>Password</label>

            <Input
              {...register('password')}
              type='text'
              id='password'
              name='password'
            />
            <p className='text-sm text-danger'>
              {errors?.password?.message || ' '}
            </p>
          </div>

          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className='text-center text-sm text-secondary'>
          <p>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='text-primary hover:text-primary/90'>
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </Container>
  )
}

export default SignUpForm
