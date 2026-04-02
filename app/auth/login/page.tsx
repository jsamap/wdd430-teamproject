'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions/auth.actions';
import Link from 'next/link';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-neutral">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Welcome</h1>
          <p className="text-gray-500 font-sans">Login into Handcrafted Haven</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-900 font-sans"
              htmlFor="email"
            >
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
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-900 font-sans"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>

          <button
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex justify-center items-center"
            aria-disabled={isPending}
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging In...
              </span>
            ) : (
              'Log in'
            )}
          </button>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

        </form>

        <div className="mt-6 text-center text-sm font-sans text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-bold text-secondary hover:underline transition-all">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}