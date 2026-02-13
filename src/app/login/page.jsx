'use client';

import GoogleSignIn from '@/components/GoogleSignIn';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useSelector(state => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-600">
      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping">
                  <div className="w-24 h-24 bg-white rounded-full opacity-20"></div>
                </div>
                <div className="relative w-24 h-24">
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur"></div> */}
                  <div className="relative border-2 border-white flex items-center justify-center w-full h-full bg-purple-500 rounded-full">
                    <div className="text-white text-xs">Bookmark.com</div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-6 text-2xl md:text-4xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm md:text-lg text-gray-300">
              {user?.email ? `Signed in as ${user?.email}` : "Sign in to your account to continue"}
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-gray-900/50 border-1 border-gray-700 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-white text-xs md:text-lg">Secure authentication with Google</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-white text-xs md:text-lg">No password to remember</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-white text-xs md:text-lg">One-click sign in</p>
              </div>
            </div>
          </div>

          {
            user?._id ?
              <div className="mt-8">
                <button
                  className="cursor-pointer group relative w-full flex items-center justify-center px-6 py-3
                 bg-white hover:bg-gray-50 
                 border-2 border-transparent 
                 rounded-xl 
                 text-gray-700 font-semibold 
                 transition-all duration-300 
                 transform hover:scale-102 
                 disabled:opacity-70 disabled:cursor-not-allowed 
                 disabled:hover:scale-100
                 shadow-lg hover:shadow-xl"
                  onClick={() => router.push('/dashboard')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <span className="text-sm md:text-lg ">Continue to Dashboard</span>
                </button>
              </div>
              :
              <div className="mt-8">
                <GoogleSignIn />
              </div>
          }

          <div className="text-center mt-8">
            <p className="text-xs md:text-sm text-white">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-pink-400 hover:text-pink-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-pink-400 hover:text-pink-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}