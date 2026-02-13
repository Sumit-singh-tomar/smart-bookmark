'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoogleSignIn from '@/components/GoogleSignIn';
import LoadingSpinner from '@/components/LoadingSpinner';
// import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
//   const { user, loading } = useAuth();
const user = null; // Replace with actual user state
const loading = false; // Replace with actual loading state
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping">
                  <div className="w-20 h-20 bg-purple-400 rounded-full opacity-20"></div>
                </div>
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur"></div>
                  <div className="relative flex items-center justify-center w-full h-full bg-gray-900 rounded-full">
                      <div className="text-white text-xs">BookMark</div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-6 text-4xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Sign in to your account to continue
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-300">Secure authentication with Google</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-300">No password to remember</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-300">One-click sign in</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <GoogleSignIn />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}