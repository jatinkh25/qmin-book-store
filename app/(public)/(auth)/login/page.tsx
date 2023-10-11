'use client'

import Link from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { cn } from '@/utils/helpers'
import { Icons } from '@/components/icons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/auth'
import { updateUserState } from '@/store/slices/userSlice'
import { User } from '@/utils/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required')
        .matches(/^[\w\.-]+@[\w\.-]+\.\w+$/, 'Please enter a valid email'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password should have a minimum of 8 characters.'),
    }),
    onSubmit: async ({ email, password }) => {
      const loginPayload = {
        email,
        password,
      }

      try {
        const response = await login(loginPayload)

        const token = response.access_token
        const account: User = jwt_decode(token)
        dispatch(updateUserState({ isSignedIn: true, user: account }))

        router.push('/books')
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    },
  })

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-3xl lg:hidden text-center font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Revolutionize Your Books Experience
          </h1>
          <p className="pt-1 lg:hidden text-zinc-200 text-sm sm:lg text-center dark:text-zinc-100 mx-auto">
            Join us and get into the world of Books.
          </p>
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your email and password to Sign In</p>
        </div>
        <div className={cn('grid gap-6', 'w-full sm:max-w-sm mx-auto')}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1 pb-3">
                <Label htmlFor="email" className="pb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  isError={formik.touched.email && formik.errors.email != null}
                  error={formik.errors.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="grid gap-1 pb-4">
                <Label htmlFor="password" className="pb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  isError={formik.touched.password && formik.errors.password != null}
                  error={formik.errors.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                />
              </div>
              <Button disabled={formik.isSubmitting} type="submit">
                {formik.isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={formik.isSubmitting}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
