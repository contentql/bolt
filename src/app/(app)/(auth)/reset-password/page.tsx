import { unstable_noStore as noStore } from 'next/cache'

import {
  GenerateResetTokenForm,
  ResetPasswordForm,
} from '@/components/auth/ResetPasswordForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  noStore()
  const token = searchParams?.token || null

  return (
    <div>
      {token ? <ResetPasswordForm token={token} /> : <GenerateResetTokenForm />}
    </div>
  )
}
