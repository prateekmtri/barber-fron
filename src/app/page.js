"use client";
import { useSession, signIn as nextAuthSignIn } from "next-auth/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function Home() {
  const { data: nextAuthSession } = useSession();
  const [firebaseUser] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Motion Effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radialGradient = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserSession(sessionStorage.getItem('user'));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (firebaseUser || nextAuthSession || userSession) {
      router.push('/all-in-one'); 
    }
  }, [firebaseUser, nextAuthSession, userSession, router]);

  const handleSignIn = (provider) => {
    nextAuthSignIn(provider);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-20 w-20 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Animated Background Layer */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ background: radialGradient }}
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{
            scale: [0, 0.8, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          {/* Logo Container */}
          <motion.div
            className="relative w-64 h-64 mx-auto mb-12 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-2xl group-hover:bg-indigo-500/30 transition-all duration-300" />
            <img
              src="https://i.pinimg.com/474x/0e/a2/af/0ea2af18fe4b359031dbd136db2028b0.jpg"
              className="relative z-10 w-full h-full rounded-3xl object-cover border-2 border-white/10 shadow-xl"
              alt="App Logo"
            />
          </motion.div>
          
          {/* Headings */}
          <h1 className="text-5xl font-bold text-white mb-6 font-sans">
            Welcome to 
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              {' '}Smart Portal
            </span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Your Next-Generation Academic Management System with AI-powered Insights
          </p>
        </motion.div>

        {/* Auth Buttons */}
        {!nextAuthSession && !firebaseUser && !userSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md space-y-6"
          >
            {/* Google Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex items-center justify-center gap-3 border border-white/20 shadow-lg"
              onClick={() => handleSignIn('google')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v0m0-6v0m0 0h0m0 0h0"
                />
              </svg>
              <span className="text-white font-semibold text-lg">
                Continue with Google
              </span>
            </motion.button>

            {/* Email Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 rounded-xl p-4 flex items-center justify-center gap-3 border border-white/20 shadow-lg"
              onClick={() => router.push('/sign-up')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-white font-semibold text-lg">
                Continue with Email
              </span>
            </motion.button>

            {/* Separator */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-transparent text-sm text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-xl p-4 text-white font-semibold shadow-lg"
              onClick={() => router.push('/sign-in')}
            >
              Secure Sign In
            </motion.button>
          </motion.div>
        )}

        {/* Footer - Fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-auto pt-12 text-center text-gray-400 text-sm"
        >
          <p>Trusted by 500+ institutions worldwide</p>
          <div className="flex justify-center gap-2 mt-2">
            {['★', '★', '★', '★', '★'].map((star, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.2
                }}
                className="text-indigo-400"
              >
                {star}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}