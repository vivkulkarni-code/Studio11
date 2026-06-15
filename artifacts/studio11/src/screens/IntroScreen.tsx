import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSessionStore } from '@/store/sessionStore';

export default function IntroScreen() {
  const setAppScreen = useSessionStore(s => s.setAppScreen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppScreen('gender');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setAppScreen]);

  return (
    <div className="w-full h-[100dvh] bg-[#0B0B0F] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_50%)] pointer-events-none" />

      <motion.div 
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="font-serif text-5xl md:text-7xl text-white tracking-[0.5em] ml-[0.5em] mb-4 text-center">
          STUDIO11
        </h1>
        
        <motion.div 
          className="h-[1px] bg-primary mb-6"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />
        
        <motion.p 
          className="font-sans text-sm text-white/50 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Luxury Salon Experience
        </motion.p>
      </motion.div>
    </div>
  );
}