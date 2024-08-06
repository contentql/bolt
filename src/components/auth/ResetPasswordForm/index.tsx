'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { Input } from '@/components/common/Input'

import { generateResetPasswordToken, resetPassword } from './actions'

const generateTokenSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
})

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  token: z.string(),
})

// Form component to request a password reset token
// Sends reset password link to user email
export function GenerateResetTokenForm() {
  const form = useForm<z.infer<typeof generateTokenSchema>>({
    resolver: zodResolver(generateTokenSchema),
    mode: 'onBlur',
    // defaultValues: { email: '' },
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
    <Container className='grid items-center'>
      <Container className='max-w-lg'>
        {message && (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <h1 className='mb-12 text-lg font-semibold md:text-xl'>
          Reset your password
        </h1>

        <p className='text-secondary'>
          Forgot your password? Please enter your email and we'll send you a
          reset link
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-20 space-y-20 text-sm'>
          <div className='space-y-4'>
            <label htmlFor='email'>Email</label>

            <Input
              {...register('email')}
              type='email'
              id='email'
              name='email'
              placeholder='john.doe@example.com'
            />

            <p className='text-sm text-danger'>
              {errors?.email?.message || ' '}
            </p>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
          </Button>
        </form>
      </Container>
    </Container>
  )
}

// Form component to reset the password using the provided token
// This is to reset the password
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
    <Container className='grid items-center'>
      <Container className='max-w-lg'>
        {message && (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <h1 className='mb-12 text-lg font-semibold md:text-xl'>
          Create new password
        </h1>

        <p className='text-secondary'>
          Please choose a new password, Must be at least
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-20 space-y-20 text-sm'>
          <div className='space-y-4'>
            <label htmlFor='password'>Password</label>

            <Input
              {...register('password')}
              type='password'
              id='password'
              name='password'
              placeholder='Enter new password'
            />

            <p className='text-sm text-danger'>
              {errors?.password?.message || ' '}
            </p>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Reset password'}
          </Button>
        </form>
      </Container>
    </Container>
  )
}
