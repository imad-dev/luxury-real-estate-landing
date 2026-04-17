import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0C1020] px-6 pb-20 md:pb-0">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[0.65rem] tracking-[0.25em] uppercase text-[#B8975A] mb-6"
        >
          Error 404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-light text-white leading-none mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 14rem)',
          }}
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 text-sm max-w-[36ch] mx-auto mb-10 leading-[1.8]"
        >
          This page seems to have vanished into the Mediterranean. Let us guide you back to our collection.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <Link
            to="/"
            className="px-8 py-3.5 bg-[#B8975A] text-[#0C1020] text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-[#9B7D42] transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/properties"
            className="px-8 py-3.5 border border-white/20 text-white text-[0.7rem] tracking-[0.15em] uppercase hover:border-[#B8975A] hover:text-[#B8975A] transition-colors"
          >
            View Properties
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
