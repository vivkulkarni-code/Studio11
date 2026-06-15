import { motion } from 'framer-motion';
import { useSessionStore, Gender } from '@/store/sessionStore';
import { useState } from 'react';

export default function GenderScreen() {
  const setGender = useSessionStore(s => s.setGender);
  const setAppScreen = useSessionStore(s => s.setAppScreen);
  const [selected, setSelected] = useState<Gender | null>(null);

  const handleBegin = () => {
    if (selected) {
      setGender(selected);
      setAppScreen('main');
    }
  };

  const genders: Gender[] = ['MALE', 'FEMALE', 'KIDS'];

  return (
    <div className="w-full h-[100dvh] bg-[#0B0B0F] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle animated gradient */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="z-10 flex flex-col items-center w-full px-6">
        <motion.p 
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Select Your Experience
        </motion.p>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl text-white mb-16 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Studio11
        </motion.h2>

        <motion.div 
          className="flex flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {genders.map((g) => (
            <motion.button
              key={g}
              data-testid={`button-gender-${g}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(g)}
              className={`
                backdrop-blur-2xl rounded-full px-6 py-3 font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300
                ${selected === g 
                  ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                  : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10'
                }
              `}
              style={{ borderWidth: '1px' }}
            >
              {g}
            </motion.button>
          ))}
        </motion.div>

        {selected && (
          <motion.button
            data-testid="button-begin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBegin}
            className="bg-primary text-primary-foreground font-sans uppercase tracking-[0.2em] text-sm px-12 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            Begin Experience
          </motion.button>
        )}
      </div>
    </div>
  );
}