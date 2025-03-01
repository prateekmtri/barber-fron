"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { EnvelopeIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      setTimeout(() => router.push('/sign-in'), 1500);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-2xl hover:scale-[1.005]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
            Create Account
          </h1>
          <p className="text-gray-300">Join our community to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Sign Up Now'
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error.message}</span>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/sign-in')}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                {/* Google SVG icon */}
              </svg>
              Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                {/* GitHub SVG icon */}
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;