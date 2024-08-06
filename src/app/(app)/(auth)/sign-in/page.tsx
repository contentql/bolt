// import { redirect } from 'next/navigation'
import SignInForm from '@/components/auth/SignInForm'

// import { auth } from '@/lib/authjs-payload-adapter/auth'

const SignInPage = async () => {
  // const session = await auth()
  // if (session) return redirect('/')
  return <SignInForm />
}

export default SignInPage
