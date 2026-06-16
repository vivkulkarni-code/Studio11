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

  const genders: { key: Gender; label: string; subtitle: string; accent: string }[] = [
    { key: 'MALE', label: 'Male', subtitle: 'Silver Experience', accent: '#C0C0C0' },
    { key: 'FEMALE', label: 'Female', subtitle: 'Gold Experience', accent: '#D4AF37' },
  ];

  return (
    <div className="w-full h-[100dvh] bg-[#0B0B0F] flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: selected === 'MALE'
            ? 'radial-gradient(circle at center, rgba(192,192,192,0.06) 0%, transparent 65%)'
            : selected === 'FEMALE'
            ? 'radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 65%)'
            : 'radial-gradient(circle at center, rgba(212,175,55,0.04) 0%, transparent 65%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="z-10 flex flex-col items-center w-full px-6">
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] mb-3 text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#D4AF37' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Select Your Experience
        </motion.p>

        <motion.h2
          className="italic text-4xl md:text-5xl text-white mb-14 text-center"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Studio11
        </motion.h2>

        <motion.div
          className="flex flex-row gap-5 mb-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {genders.map((g) => (
            <motion.button
              key={g.key}
              data-testid={`button-gender-${g.key}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(g.key)}
              className="backdrop-blur-2xl rounded-2xl px-8 py-5 transition-all duration-300 flex flex-col items-center gap-1"
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: selected === g.key ? g.accent : 'rgba(255,255,255,0.12)',
                background: selected === g.key
                  ? `rgba(${g.key === 'MALE' ? '192,192,192' : '212,175,55'},0.1)`
                  : 'rgba(255,255,255,0.04)',
                boxShadow: selected === g.key
                  ? `0 0 24px ${g.key === 'MALE' ? 'rgba(192,192,192,0.18)' : 'rgba(212,175,55,0.22)'}`
                  : 'none',
              }}
            >
              <span
                className="uppercase tracking-[0.25em] text-sm font-medium"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: selected === g.key ? g.accent : 'rgba(255,255,255,0.75)',
                }}
              >
                {g.label}
              </span>
              <span
                className="text-[10px] tracking-[0.15em]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: selected === g.key ? `${g.accent}99` : 'rgba(255,255,255,0.35)',
                }}
              >
                {g.subtitle}
              </span>
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
            className="uppercase tracking-[0.25em] text-sm px-12 py-4 rounded-full"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: selected === 'MALE' ? '#C0C0C0' : '#D4AF37',
              color: '#0B0B0F',
              fontWeight: 600,
              boxShadow: selected === 'MALE'
                ? '0 0 30px rgba(192,192,192,0.25)'
                : '0 0 30px rgba(212,175,55,0.25)',
            }}
          >
            Begin Experience
          </motion.button>
        )}
      </div>
    </div>
  );
}
