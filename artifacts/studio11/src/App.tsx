import { useSessionStore } from '@/store/sessionStore';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from '@/screens/IntroScreen';
import PersonalFocusScreen from '@/screens/PersonalFocusScreen';
import MainScreen from '@/screens/MainScreen';
import GalleryScreen from '@/screens/GalleryScreen';

function App() {
  const appScreen = useSessionStore(s => s.appScreen);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence mode="wait">
        {appScreen === 'intro' && (
          <motion.div key="intro" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <IntroScreen />
          </motion.div>
        )}
        {appScreen === 'focus' && (
          <motion.div key="focus" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <PersonalFocusScreen />
          </motion.div>
        )}
        {appScreen === 'main' && (
          <motion.div key="main" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MainScreen />
          </motion.div>
        )}
        {appScreen === 'gallery' && (
          <motion.div key="gallery" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
            <GalleryScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;
