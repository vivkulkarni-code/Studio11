import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Trash2, X, Plus } from 'lucide-react';
import { useSessionStore, Gender } from '@/store/sessionStore';
import { getServicesByGenderAndCategory } from '@/data/services';
import { categoryTaglines, categoryGradients, MALE_CATEGORIES, FEMALE_CATEGORIES, KIDS_CATEGORIES } from '@/data/categories';
import { recommendationMap } from '@/data/recommendations';
import { useSwipe } from '@/hooks/useSwipe';

export default function MainScreen() {
  const { gender, activeCategory, setActiveCategory } = useSessionStore();
  
  const cats = gender === 'MALE' ? MALE_CATEGORIES : gender === 'FEMALE' ? FEMALE_CATEGORIES : KIDS_CATEGORIES;

  const handleNext = () => {
    const idx = cats.indexOf(activeCategory);
    if (idx < cats.length - 1) setActiveCategory(cats[idx + 1]);
  };

  const handlePrev = () => {
    const idx = cats.indexOf(activeCategory);
    if (idx > 0) setActiveCategory(cats[idx - 1]);
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev
  });

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-background relative overflow-hidden">
      <Header />
      <CategoryTabs cats={cats} />
      
      <div className="flex-1 flex flex-col min-h-0 relative" {...swipeHandlers}>
        <CinematicArea />
        <ServiceList />
      </div>

      <ProgressIndicator />

      {/* Overlays */}
      <ServiceDrawer />
      <DecisionModal />
      <SessionDrawer />
      <CategoryStoryIntro />
    </div>
  );
}

function Header() {
  const { gender, setGender, itemCount, totalPrice, setSessionDrawerOpen } = useSessionStore();
  const count = itemCount();
  const total = totalPrice();

  return (
    <div className="fixed top-0 left-0 right-0 h-[64px] bg-black/60 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-6">
      <div className="font-serif font-semibold text-white tracking-[0.4em] uppercase text-lg shrink-0">
        STUDIO11
      </div>

      <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
        {(['MALE', 'FEMALE', 'KIDS'] as Gender[]).map(g => (
          <button
            key={g}
            data-testid={`button-header-gender-${g}`}
            onClick={() => setGender(g)}
            className={`px-3 py-1 text-[10px] md:text-xs rounded-full uppercase tracking-widest transition-all ${gender === g ? 'bg-primary text-black font-semibold shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-white/60 hover:text-white'}`}
          >
            {g}
          </button>
        ))}
      </div>

      <button 
        data-testid="button-session"
        onClick={() => setSessionDrawerOpen(true)}
        className="flex items-center gap-3 shrink-0 group hover:scale-105 transition-transform"
      >
        <div className="flex-col items-end hidden md:flex">
          <span className="text-[10px] text-white/60 uppercase tracking-widest">My Session</span>
          {count > 0 && <span className="text-xs text-primary font-medium tracking-wider">₹{total.toLocaleString('en-IN')}</span>}
        </div>
        <div className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-primary/50 transition-colors">
          <span className="text-white text-xs font-medium">{count}</span>
          {count > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]" />
          )}
        </div>
      </button>
    </div>
  );
}

function CategoryTabs({ cats }: { cats: string[] }) {
  const { activeCategory, setActiveCategory } = useSessionStore();

  return (
    <div className="pt-[64px] flex-none border-b border-white/10 bg-black/40 backdrop-blur-md relative z-40">
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-3 gap-3">
        {cats.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              data-testid={`tab-category-${cat}`}
              onClick={() => setActiveCategory(cat as any)}
              className={`
                shrink-0 rounded-full px-5 py-2 text-[10px] font-sans uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden
                ${isActive ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-105' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10'}
              `}
            >
              <span className="relative z-10">{cat}</span>
              {isActive && (
                <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:200%_100%] animate-[goldSweep_8s_ease-in-out_infinite]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CinematicArea() {
  const { activeCategory } = useSessionStore();
  const gradient = categoryGradients[activeCategory];

  return (
    <div className="relative h-[220px] w-full flex-none overflow-hidden border-b border-white/10 flex items-center justify-center shrink-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          className="absolute inset-0 z-0"
          style={{ background: gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 z-0" />
      <h2 className="relative z-10 font-serif text-6xl md:text-8xl text-white/10 uppercase tracking-widest text-center select-none pointer-events-none w-full px-4 break-words leading-none">
        {activeCategory}
      </h2>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />
    </div>
  );
}

function ServiceList() {
  const { gender, activeCategory, selectService, selectedService } = useSessionStore();
  const services = getServicesByGenderAndCategory(gender, activeCategory);

  return (
    <div className="flex-1 overflow-y-auto pb-[60px]">
      <AnimatePresence mode="popLayout">
        {services.map((service, i) => {
          const isSelected = selectedService?.id === service.id;
          const hasSelection = !!selectedService;
          return (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hasSelection && !isSelected ? 0.5 : 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.99 }}
              onClick={() => selectService(service)}
              data-testid={`card-service-${service.id}`}
              className={`
                relative cursor-pointer border-b border-white/8 py-4 px-6 flex items-center justify-between transition-all duration-300
                ${isSelected ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(212,175,55,0.1)] scale-[1.01]' : ''}
              `}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" />
              <div className="flex flex-col ml-4">
                <h3 className="font-serif text-lg text-white uppercase tracking-wide">{service.name}</h3>
                <p className="text-white/40 text-sm tracking-wide">₹{service.price.toLocaleString('en-IN')} <span className="mx-2 opacity-50">•</span> {service.duration} MIN</p>
              </div>
              <ChevronRight className="text-white/30" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function ServiceDrawer() {
  const { drawerOpen, setDrawerOpen, selectedService, addToSession } = useSessionStore();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!selectedService) return;
    setAdding(true);
    setTimeout(() => {
      addToSession(selectedService);
      setAdding(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {drawerOpen && selectedService && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) setDrawerOpen(false);
            }}
            className="fixed bottom-0 left-0 right-0 bg-[#0A0A0C]/95 backdrop-blur-2xl border-t border-white/15 rounded-t-3xl z-50 flex flex-col max-h-[85vh]"
          >
            <div className="w-full flex justify-center pt-4 pb-2 shrink-0 cursor-grab">
              <div className="w-[40px] h-[4px] bg-white/20 rounded-full" />
            </div>
            
            <div className="px-6 pb-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h2 className="font-serif text-3xl text-white mb-2">{selectedService.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="border border-white/20 text-white/60 text-xs px-3 py-1 rounded-full uppercase tracking-widest">{selectedService.duration} MIN</span>
                <span className="text-primary font-serif text-2xl font-semibold">₹{selectedService.price.toLocaleString('en-IN')}</span>
              </div>
              
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                {selectedService.description}
              </p>
              
              <h4 className="text-white/40 text-xs uppercase tracking-widest mb-3">Includes:</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedService.benefits.map(b => (
                  <span key={b} className="border border-white/15 text-white/50 text-xs px-3 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              <div className="relative">
                <button
                  data-testid="button-add-to-session"
                  onClick={handleAdd}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-semibold uppercase tracking-widest py-4 rounded-2xl transition-transform active:scale-[0.98]"
                >
                  {adding ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check size={20} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span>Added</span>
                    </motion.div>
                  ) : (
                    "Add to Session"
                  )}
                </button>
                {adding && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     {Array.from({ length: 8 }).map((_, i) => (
                       <motion.div
                         key={i}
                         initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                         animate={{ 
                           x: (Math.random() - 0.5) * 120, 
                           y: (Math.random() - 0.5) * 120,
                           opacity: 0,
                           scale: 0
                         }}
                         transition={{ duration: 0.6, ease: "easeOut" }}
                         className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#D4AF37]"
                       />
                     ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DecisionModal() {
  const { showDecisionModal, setShowDecisionModal, lastAddedService, gender, addToSession, setSessionDrawerOpen } = useSessionStore();

  if (!showDecisionModal || !lastAddedService) return null;

  const recCats = recommendationMap[lastAddedService.category] || [];
  const recommendedServices = recCats.map(cat => {
     const s = getServicesByGenderAndCategory(gender, cat);
     return s[0];
  }).filter(Boolean);

  const handleAddMore = () => setShowDecisionModal(false);
  const handleReview = () => {
     setShowDecisionModal(false);
     setSessionDrawerOpen(true);
  };

  return (
    <AnimatePresence>
      {showDecisionModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#121216] border border-white/15 rounded-3xl p-8 w-full max-w-sm"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                <Check className="text-primary" size={24} />
              </div>
              <h3 className="text-white/60 text-[10px] uppercase tracking-widest mb-2">Added to Session</h3>
              <h2 className="font-serif text-2xl text-white">{lastAddedService.name}</h2>
            </div>

            {recommendedServices.length > 0 && (
              <div className="mb-8">
                <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3 text-center">Frequently Paired With</h4>
                <div className="flex flex-col gap-2">
                  {recommendedServices.map(rec => (
                    <div key={rec.id} className="border border-white/10 rounded-full pl-4 pr-1 py-1 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-sm text-white/70 truncate mr-2 font-serif">{rec.name}</span>
                      <button 
                        data-testid={`button-add-rec-${rec.id}`}
                        onClick={() => addToSession(rec)}
                        className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                data-testid="button-add-more"
                onClick={handleAddMore}
                className="w-full border border-white/20 text-white font-sans text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                Add More Services
              </button>
              <button 
                data-testid="button-review-session"
                onClick={handleReview}
                className="w-full bg-primary text-black font-sans font-semibold text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform"
              >
                Review Session
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SessionDrawer() {
  const { sessionDrawerOpen, setSessionDrawerOpen, sessionItems, removeFromSession, totalPrice, totalDuration } = useSessionStore();

  const handleWhatsApp = () => {
    const total = totalPrice();
    const serviceList = sessionItems.map(i => `• ${i.service.name} — ₹${i.service.price.toLocaleString('en-IN')}`).join('\n');
    const msg = `Hello Studio11,\n\nI would like to book the following services:\n\n${serviceList}\n\nTotal Amount: ₹${total.toLocaleString('en-IN')}\nPreferred Date: \nPreferred Time: \n\nPlease confirm availability.`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {sessionDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSessionDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[min(380px,90vw)] bg-[#0D0D11] border-l border-white/10 z-[80] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <h2 className="font-serif text-2xl text-white tracking-widest uppercase">My Session</h2>
              <button data-testid="button-close-session" onClick={() => setSessionDrawerOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 flex flex-col gap-4">
              {sessionItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/30 gap-4">
                   <span className="font-serif italic text-xl">Your session is empty</span>
                </div>
              ) : (
                sessionItems.map(item => (
                  <div key={item.service.id} data-testid={`session-item-${item.service.id}`} className="flex items-start justify-between border-b border-white/8 pb-4">
                    <div className="flex flex-col pr-4">
                      <span className="font-serif text-lg text-white leading-snug mb-1">{item.service.name}</span>
                      <span className="text-primary text-sm font-medium tracking-wide">₹{item.service.price.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      data-testid={`button-remove-${item.service.id}`}
                      onClick={() => removeFromSession(item.service.id)}
                      className="text-white/20 hover:text-destructive transition-colors shrink-0 mt-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {sessionItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/20 shrink-0">
                <div className="flex items-end justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Total Duration</span>
                    <span className="text-white font-serif text-xl">{totalDuration()} Min</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Total Price</span>
                    <span className="font-serif text-3xl text-primary leading-none">₹{totalPrice().toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <button 
                  data-testid="button-book-appointment"
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-semibold text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform mb-3"
                >
                  Book Appointment
                </button>
                <button 
                  data-testid="button-whatsapp"
                  onClick={handleWhatsApp}
                  className="w-full border border-primary text-primary font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  WhatsApp Booking
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProgressIndicator() {
  const { itemCount, sessionDrawerOpen } = useSessionStore();
  
  const steps = ['DISCOVER', 'BUILD SESSION', 'REVIEW', 'BOOK'];
  
  let activeIdx = 0;
  if (itemCount() > 0) activeIdx = 1;
  if (sessionDrawerOpen) activeIdx = 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] bg-black/80 backdrop-blur-md border-t border-white/8 z-40 flex items-center justify-center px-4">
      <div className="flex items-center gap-4 md:gap-8 relative">
        <div className="absolute top-1/2 left-[5%] right-[5%] h-[1px] bg-white/10 -translate-y-1/2 z-0 hidden md:block" />
        
        {steps.map((step, idx) => {
          const isActive = idx === activeIdx;
          const isPast = idx < activeIdx;
          return (
            <div key={step} className="flex items-center gap-2 z-10 bg-transparent px-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary scale-150 shadow-[0_0_8px_#D4AF37]' : isPast ? 'bg-primary/50' : 'bg-white/20'} transition-all duration-500`} />
              <span className={`text-[9px] md:text-[10px] uppercase tracking-widest ${isActive ? 'text-primary font-medium' : isPast ? 'text-white/60' : 'text-white/30 hidden md:block'} transition-colors duration-500`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryStoryIntro() {
  const { activeCategory } = useSessionStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 1.05, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl text-white uppercase tracking-[0.3em] mb-4 text-center ml-[0.3em]"
          >
            {activeCategory}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-sans text-white/60 tracking-[0.2em] text-xs md:text-sm uppercase text-center px-6"
          >
            {categoryTaglines[activeCategory]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}