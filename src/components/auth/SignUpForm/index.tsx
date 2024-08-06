'use client'

import { Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signUp } from './actions'

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'E-mail is required' })
    .email({ message: 'E-mail is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
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
    <div className='flex min-h-screen bg-black'>
      <div className='flex w-full items-center justify-center'>
        <div className='w-full max-w-md p-6'>
          {backendSignUpResponse &&
          !backendSignUpResponse?.success &&
          backendSignUpResponse?.error ? (
            <p color='red'>{backendSignUpResponse.error.message}</p>
          ) : null}
          {backendSignUpResponse && backendSignUpResponse?.success ? (
            <p color='green'>Account created! Redirecting...</p>
          ) : null}
          <h1 className='mb-6 text-center text-3xl font-semibold text-white'>
            Sign Up
          </h1>
          <h1 className='mb-6 text-center text-sm font-semibold text-gray-300'>
            Join to Our Community with all time access and free{' '}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-300'>
                    First Name
                  </label>
                  {errors?.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('firstName')}
                  type='text'
                  id='firstName'
                  name='firstName'
                  placeholder='John'
                />
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-300'>
                    Last Name
                  </label>
                  {errors?.lastName && (
                    <p className='text-sm text-red-500'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('lastName')}
                  type='text'
                  id='lastName'
                  name='lastName'
                  placeholder='Doe'
                />
              </LabelInputContainer>
            </div>

            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-300'>
                    E-Mail
                  </label>
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
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
                    className='block text-sm font-medium text-gray-300'>
                    Password
                  </label>
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                />
              </LabelInputContainer>
            </div>
            <div>
              <button
                type='submit'
                className='w-full rounded-md border-[1px] border-indigo-600 bg-indigo-600 p-2 text-white transition-all duration-500 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-opacity-50'
                disabled={isPending}>
                {isPending ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm text-gray-300'>
            <p>
              Already have an account?{' '}
              <a href='/sign-in' className='text-white hover:underline'>
                SignIn here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
