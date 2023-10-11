'use client'

import Link from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import jwt_decode from 'jwt-decode'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils/helpers'
import { signup } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { User } from '@/utils/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { updateUserState } from '@/store/slices/userSlice'

export default function Signup() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required')
        .matches(/^[\w\.-]+@[\w\.-]+\.\w+$/, 'Please enter a valid email'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Confirm Password must be same as Password'),
    }),
    onSubmit: async ({ firstName, lastName, email, password }) => {
      const signupPayload = {
        firstName,
        lastName,
        email,
        password,
      }

      try {
        const response = await signup(signupPayload)

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
    <>
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
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className={cn('grid gap-6', 'w-full sm:max-w-sm mx-auto')}>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-2">
                <div className="flex gap-3">
                  <div className="pb-3">
                    <Label htmlFor="firstName" className="pb-3 block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="first-name"
                      autoCorrect="off"
                      isError={formik.touched.firstName && formik.errors.firstName != null}
                      error={formik.errors.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="pb-3">
                    <Label htmlFor="lastName" className="pb-3 block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="last-name"
                      autoCorrect="off"
                      isError={formik.touched.lastName && formik.errors.lastName != null}
                      error={formik.errors.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid gap-1 pb-3">
                  <Label htmlFor="email" className="pb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
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
                <div className="grid gap-1 pb-4">
                  <Label htmlFor="confirmPassowrd" className="pb-2">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassowrd"
                    name="confirmPassword"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="confirm-password"
                    autoCorrect="off"
                    isError={
                      formik.touched.confirmPassword && formik.errors.confirmPassword != null
                    }
                    error={formik.errors.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  />
                </div>
                <Button disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                  Sign Up
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
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
