'use client'

import { Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { generateResetPasswordToken, resetPassword } from './actions'

const generateTokenSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  token: z.string(),
})

// Form component to request a password reset token
export function GenerateResetTokenForm() {
  const form = useForm<z.infer<typeof generateTokenSchema>>({
    resolver: zodResolver(generateTokenSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = async (data: z.infer<typeof generateTokenSchema>) => {
    startTransition(async () => {
      const response = await generateResetPasswordToken(data)
      if (!response.success) {
        form.setError('email', {
          type: 'manual',
          message: response.error.message,
        })
        setMessage(null)
      } else {
        setMessage(
          "Reset link sent to your email. Don't forget to check your spam inbox!",
        )
      }
    })
  }

  return (
    <main
      id='content'
      role='main'
      className='flex min-h-screen w-full items-center justify-center bg-black'>
      <div className='mx-auto w-full max-w-md rounded-none drop-shadow-2xl md:rounded-2xl md:p-8'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
            Forgot password?
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Remember your password?
            <a
              className='pl-1 font-medium text-indigo-600 decoration-1 hover:underline'
              href='/sign-in'>
              SignIn here
            </a>
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              {message && <p className='text-red-500'>{message}</p>}
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='email'
                      className='mb-2 ml-1 block text-sm font-bold dark:text-white'>
                      Email address
                    </label>
                    {errors.email && (
                      <p
                        className='mt-2 hidden text-xs text-red-600'
                        id='email-error'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('email')}
                    type='email'
                    id='email'
                    name='email'
                    placeholder='jon@gmail.com'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50 dark:focus:ring-offset-gray-800'>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

// Form component to reset the password using the provided token
export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token, password: '' },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      const result = await resetPassword({ ...data, redirectTo: '/profile' })
      if (!result.success) {
        form.setError('password', {
          type: 'manual',
          message:
            result?.error?.message ||
            'Failed to reset password. Please try again.',
        })
        setMessage(null)
      } else {
        setMessage('Password reset successfully. Redirecting...')
        setTimeout(() => router.push('/profile'), 2000)
      }
    })
  }

  return (
    <main className='flex h-screen w-full items-center justify-center bg-black'>
      <div className='w-full max-w-md rounded-none drop-shadow-2xl md:rounded-2xl md:p-8'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
            Almost there!
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Please enter a new password to reset.
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              {message && <p className='text-green-500'>{message}</p>}
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='password'
                      className='mb-2 ml-1 block text-sm font-bold dark:text-white'>
                      Enter password
                    </label>
                    {errors.password && (
                      <p
                        className='mt-2 hidden text-xs text-red-600'
                        id='email-error'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('password')}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='● ● ● ● ● ● ● ●'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50 dark:focus:ring-offset-gray-800'>
                {isSubmitting ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
