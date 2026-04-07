'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions/auth.actions';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, { message: '', errors: {} });

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-neutral">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Create Account</h1>
          <p className="text-gray-500 font-sans">Join Handcrafted Haven</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 font-sans" htmlFor="name">
              Full Name
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 font-sans" htmlFor="email">
              Email Address
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 font-sans" htmlFor="password">
              Password
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              required
              minLength={6}
            />
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 font-sans" htmlFor="role">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white font-sans"
              required
            >
              <option value="buyer">Buyer (I want to buy)</option>
              <option value="seller">Seller (I want to sell)</option>
            </select>
            {state?.errors?.role && (
              <p className="mt-1 text-sm text-red-500">{state.errors.role[0]}</p>
            )}
          </div>

          <button
            className="w-full bg-secondary hover:bg-yellow-500 text-black font-bold py-3 px-4 mt-4 rounded-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex justify-center items-center"
            aria-disabled={isPending}
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>

          <div
            className="flex h-6 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.message && !state?.errors && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
          </div>

        </form>

        <div className="mt-4 text-center text-sm font-sans text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-primary hover:underline transition-all">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}