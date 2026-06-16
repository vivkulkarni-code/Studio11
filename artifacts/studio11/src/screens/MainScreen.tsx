import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Trash2, X, Plus, Scissors, Camera, ShoppingBag, Star } from 'lucide-react';
import { useSessionStore, BottomTab } from '@/store/sessionStore';
import { getServicesByGenderCategoryAndSubCategory, getServicesByGenderAndCategory } from '@/data/services';
import { categoryTaglines, categoryGradients, MALE_CATEGORIES, FEMALE_CATEGORIES } from '@/data/categories';
import { getSubCategories } from '@/data/categories';
import { getRecommendations } from '@/data/recommendations';
import { useAccentColor } from '@/hooks/useAccentColor';
import { useSwipe } from '@/hooks/useSwipe';
import logoPath from '@assets/logo_1781636770613.jpg';

export default function MainScreen() {
  const { gender, activeCategory, setActiveCategory, activeBottomTab } = useSessionStore();
  const cats = gender === 'MALE' ? MALE_CATEGORIES : FEMALE_CATEGORIES;

  const handleNext = () => {
    const idx = cats.indexOf(activeCategory);
    if (idx < cats.length - 1) setActiveCategory(cats[idx + 1]);
  };
  const handlePrev = () => {
    const idx = cats.indexOf(activeCategory);
    if (idx > 0) setActiveCategory(cats[idx - 1]);
  };
  const swipeHandlers = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-background relative overflow-hidden">
      <Header />

      {activeBottomTab === 'menu' ? (
        <>
          <CategoryTabs cats={cats} />
          <SubCategoryTabs />
          <div className="flex-1 flex flex-col min-h-0 relative" {...swipeHandlers}>
            <CinematicArea />
            <ServiceList />
          </div>
        </>
      ) : (
        <ComingSoonScreen />
      )}

      <BottomNav />

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
  const { accent, accentGlow } = useAccentColor();
  const count = itemCount();
  const total = totalPrice();

  return (
    <div className="fixed top-0 left-0 right-0 h-[64px] bg-black/60 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-white rounded-lg p-1 shadow-sm">
          <img src={logoPath} alt="Studio11" className="h-8 w-auto object-contain rounded" />
        </div>
        <span
          className="text-white tracking-[0.35em] uppercase text-base font-semibold hidden sm:block"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          STUDIO11
        </span>
      </div>

      <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
        {(['MALE', 'FEMALE'] as const).map(g => (
          <button
            key={g}
            data-testid={`button-header-gender-${g}`}
            onClick={() => setGender(g)}
            className="px-3 py-1 text-[10px] md:text-xs rounded-full uppercase tracking-widest transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: gender === g ? accent : 'transparent',
              color: gender === g ? '#0B0B0F' : 'rgba(255,255,255,0.55)',
              fontWeight: gender === g ? 700 : 400,
              boxShadow: gender === g ? accentGlow : 'none',
            }}
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
          <span className="text-[10px] text-white/60 uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>My Session</span>
          {count > 0 && (
            <span className="text-xs font-medium tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: accent }}>
              ₹{total.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <div
          className="relative w-10 h-10 rounded-full border flex items-center justify-center bg-white/5 transition-colors"
          style={{ borderColor: count > 0 ? `${accent}40` : 'rgba(255,255,255,0.2)' }}
        >
          <span className="text-white text-xs font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{count}</span>
          {count > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full shadow-lg" style={{ background: accent, boxShadow: accentGlow }} />
          )}
        </div>
      </button>
    </div>
  );
}

function CategoryTabs({ cats }: { cats: string[] }) {
  const { activeCategory, setActiveCategory, setActiveSubCategory } = useSessionStore();
  const { accent, accentMuted } = useAccentColor();

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat as any);
  };

  return (
    <div className="pt-[64px] flex-none border-b border-white/10 bg-black/40 backdrop-blur-md relative z-40">
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-3 gap-3">
        {cats.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              data-testid={`tab-category-${cat}`}
              onClick={() => handleCategoryClick(cat)}
              className="shrink-0 rounded-full px-4 py-2 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 relative overflow-hidden"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: isActive ? accent : 'rgba(255,255,255,0.05)',
                color: isActive ? '#0B0B0F' : 'rgba(255,255,255,0.65)',
                fontWeight: isActive ? 700 : 400,
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.12)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isActive ? `0 0 14px ${accent}44` : 'none',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SubCategoryTabs() {
  const { gender, activeCategory, activeSubCategory, setActiveSubCategory } = useSessionStore();
  const { accent, accentMuted, accentBorder } = useAccentColor();

  const subCats = getSubCategories(gender, activeCategory);

  useEffect(() => {
    if (subCats.length > 0 && (!activeSubCategory || !subCats.includes(activeSubCategory))) {
      setActiveSubCategory(subCats[0]);
    }
  }, [activeCategory, gender]);

  if (subCats.length <= 1) return null;

  return (
    <div className="flex-none bg-black/30 backdrop-blur-md border-b border-white/8 z-39 relative">
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-2.5 gap-2">
        {subCats.map(sub => {
          const isActive = activeSubCategory === sub;
          return (
            <button
              key={sub}
              data-testid={`tab-subcategory-${sub}`}
              onClick={() => setActiveSubCategory(sub)}
              className="shrink-0 rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.15em] transition-all duration-200"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: isActive ? accentMuted : 'transparent',
                color: isActive ? accent : 'rgba(255,255,255,0.45)',
                fontWeight: isActive ? 600 : 400,
                border: `1px solid ${isActive ? accentBorder : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {sub}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CinematicArea() {
  const { activeCategory } = useSessionStore();
  const { accent } = useAccentColor();
  const gradient = categoryGradients[activeCategory];
  const tagline = categoryTaglines[activeCategory];

  return (
    <div className="relative h-[140px] w-full flex-none overflow-hidden border-b border-white/10 flex items-center justify-center shrink-0">
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
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2
          className="text-4xl md:text-5xl text-white/10 uppercase tracking-widest select-none pointer-events-none w-full leading-none"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {activeCategory}
        </h2>
        <p
          className="text-[10px] uppercase tracking-[0.25em] mt-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: `${accent}99` }}
        >
          {tagline}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent z-10" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}60, transparent)` }} />
    </div>
  );
}

function ServiceList() {
  const { gender, activeCategory, activeSubCategory, selectService, selectedService, itemCount, sessionDrawerOpen } = useSessionStore();
  const { accent, accentMuted, accentBorder } = useAccentColor();

  const services = activeSubCategory
    ? getServicesByGenderCategoryAndSubCategory(gender, activeCategory, activeSubCategory)
    : getServicesByGenderAndCategory(gender, activeCategory);

  const steps = ['DISCOVER', 'BUILD SESSION', 'REVIEW', 'BOOK'];
  let activeIdx = 0;
  if (itemCount() > 0) activeIdx = 1;
  if (sessionDrawerOpen) activeIdx = 2;

  return (
    <div className="flex-1 overflow-y-auto pb-[68px]">
      {/* Inline progress strip */}
      <div className="flex items-center justify-center gap-3 py-3 border-b border-white/5 bg-black/20">
        {steps.map((step, idx) => {
          const isActive = idx === activeIdx;
          const isPast = idx < activeIdx;
          return (
            <div key={step} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  background: isActive ? accent : isPast ? `${accent}70` : 'rgba(255,255,255,0.2)',
                  transform: isActive ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 8px ${accent}` : 'none',
                }}
              />
              <span
                className="text-[8px] uppercase tracking-widest transition-colors duration-500"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: isActive ? accent : isPast ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
                  display: isActive ? 'block' : idx > 0 ? 'none' : 'none',
                }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        {services.map((service, i) => {
          const isSelected = selectedService?.id === service.id;
          const hasSelection = !!selectedService;
          const displayPrice = service.price === 0 ? 'Consult Us' : `₹${service.price.toLocaleString('en-IN')}`;
          return (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: hasSelection && !isSelected ? 0.45 : 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => selectService(service)}
              data-testid={`card-service-${service.id}`}
              className="relative cursor-pointer border-b py-4 px-6 flex items-center justify-between transition-all duration-300"
              style={{
                borderColor: isSelected ? `${accentBorder}` : 'rgba(255,255,255,0.06)',
                background: isSelected ? accentMuted : 'transparent',
                boxShadow: isSelected ? `inset 0 0 20px ${accent}08` : 'none',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: isSelected ? accent : `${accent}30` }} />
              <div className="flex flex-col ml-4">
                <h3
                  className="text-base text-white uppercase tracking-wide mb-0.5"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: service.price === 0 ? accent : 'rgba(255,255,255,0.5)' }}
                  >
                    {displayPrice}
                  </span>
                  {service.price > 0 && (
                    <>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="text-white/35 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {service.duration} MIN
                      </span>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0" style={{ color: isSelected ? accent : 'rgba(255,255,255,0.25)' }} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function BottomNav() {
  const { activeBottomTab, setActiveBottomTab } = useSessionStore();
  const { accent } = useAccentColor();

  const tabs: { key: BottomTab; label: string; icon: React.ReactNode }[] = [
    { key: 'menu', label: 'Menu', icon: <Scissors size={20} /> },
    { key: 'ourwork', label: 'Our Work', icon: <Camera size={20} /> },
    { key: 'products', label: 'Products', icon: <ShoppingBag size={20} /> },
    { key: 'rewards', label: 'Rewards', icon: <Star size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-black/85 backdrop-blur-2xl border-t border-white/10 z-40 flex items-center justify-around px-2">
      {tabs.map(tab => {
        const isActive = activeBottomTab === tab.key;
        return (
          <button
            key={tab.key}
            data-testid={`bottom-tab-${tab.key}`}
            onClick={() => setActiveBottomTab(tab.key)}
            className="flex flex-col items-center gap-1 py-1 px-3 transition-all duration-200"
            style={{ color: isActive ? accent : 'rgba(255,255,255,0.35)' }}
          >
            <div style={{ filter: isActive ? `drop-shadow(0 0 6px ${accent}88)` : 'none' }}>
              {tab.icon}
            </div>
            <span
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: isActive ? accent : 'rgba(255,255,255,0.35)',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ComingSoonScreen() {
  const { activeBottomTab } = useSessionStore();
  const { accent } = useAccentColor();

  const labels: Record<BottomTab, string> = {
    menu: 'Menu',
    ourwork: 'Our Work',
    products: 'Products',
    rewards: 'Rewards',
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-[64px] pb-[64px] bg-[#0B0B0F]">
      <motion.div
        className="flex flex-col items-center text-center px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border"
          style={{ background: `${accent}10`, borderColor: `${accent}30` }}
        >
          <Star size={28} style={{ color: accent }} />
        </div>
        <h2
          className="text-3xl text-white mb-3 uppercase tracking-[0.3em]"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          {labels[activeBottomTab]}
        </h2>
        <div className="h-[1px] w-12 mb-4" style={{ background: accent }} />
        <p
          className="text-sm uppercase tracking-[0.2em] mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: `${accent}80` }}
        >
          Coming Soon
        </p>
        <p
          className="text-xs leading-relaxed max-w-[260px] mt-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.3)' }}
        >
          We're crafting something extraordinary. Stay tuned for an elevated experience.
        </p>
      </motion.div>
    </div>
  );
}

function ServiceDrawer() {
  const { drawerOpen, setDrawerOpen, selectedService, addToSession, sessionItems } = useSessionStore();
  const { accent, accentGlow } = useAccentColor();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!selectedService) return;
    setAdding(true);
    setTimeout(() => {
      addToSession(selectedService);
      setAdding(false);
    }, 800);
  };

  const alreadyAdded = selectedService ? sessionItems.some(i => i.service.id === selectedService.id) : false;
  const displayPrice = selectedService?.price === 0 ? 'Consult Us' : selectedService ? `₹${selectedService.price.toLocaleString('en-IN')}` : '';

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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) setDrawerOpen(false);
            }}
            className="fixed bottom-0 left-0 right-0 bg-[#0A0A0C]/97 backdrop-blur-2xl border-t border-white/15 rounded-t-3xl z-50 flex flex-col max-h-[85vh]"
            style={{ borderTopColor: `${accent}20` }}
          >
            <div className="w-full flex justify-center pt-4 pb-2 shrink-0 cursor-grab">
              <div className="w-[40px] h-[4px] rounded-full" style={{ background: `${accent}40` }} />
            </div>

            <div className="px-6 pb-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: `${accent}80` }}>
                    {selectedService.subCategory}
                  </p>
                  <h2 className="text-2xl text-white" style={{ fontFamily: "'Bodoni Moda', serif" }}>{selectedService.name}</h2>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-white/30 hover:text-white/60 mt-1">
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <span
                  className="border text-xs px-3 py-1 rounded-full uppercase tracking-widest"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                >
                  {selectedService.duration} MIN
                </span>
                <span
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Bodoni Moda', serif", color: selectedService.price === 0 ? accent : accent }}
                >
                  {displayPrice}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.55)' }}>
                {selectedService.description}
              </p>

              <h4 className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.35)' }}>
                Includes:
              </h4>
              <div className="flex flex-wrap gap-2 mb-7">
                {selectedService.benefits.map(b => (
                  <span
                    key={b}
                    className="border text-xs px-3 py-1 rounded-full"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {!alreadyAdded ? (
                <div className="relative">
                  <button
                    data-testid="button-add-to-session"
                    onClick={handleAdd}
                    className="w-full relative overflow-hidden font-semibold uppercase tracking-widest py-4 rounded-2xl transition-transform active:scale-[0.98]"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                      color: '#0B0B0F',
                      boxShadow: accentGlow,
                    }}
                  >
                    {adding ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Check size={20} />
                        <span>Added</span>
                      </motion.div>
                    ) : (
                      'Add to Session'
                    )}
                  </button>
                </div>
              ) : (
                <div
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", border: `1px solid ${accent}40`, color: `${accent}80` }}
                >
                  <Check size={16} />
                  <span>In Session</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DecisionModal() {
  const { showDecisionModal, setShowDecisionModal, lastAddedService, gender, sessionItems, addToSession, setSessionDrawerOpen } = useSessionStore();
  const { accent, accentMuted, accentGlow } = useAccentColor();

  if (!showDecisionModal || !lastAddedService) return null;

  const sessionIds = new Set(sessionItems.map(i => i.service.id));
  const recommendedServices = getRecommendations(lastAddedService, gender, sessionIds);

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
            className="bg-[#121216] border border-white/12 rounded-3xl p-7 w-full max-w-sm"
            style={{ borderColor: `${accent}15` }}
          >
            <div className="flex flex-col items-center text-center mb-7">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border"
                style={{ background: accentMuted, borderColor: `${accent}30` }}
              >
                <Check style={{ color: accent }} size={22} />
              </div>
              <h3 className="text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.5)' }}>
                Added to Session
              </h3>
              <h2 className="text-xl text-white" style={{ fontFamily: "'Bodoni Moda', serif" }}>{lastAddedService.name}</h2>
            </div>

            {recommendedServices.length > 0 && (
              <div className="mb-7">
                <h4
                  className="text-[10px] uppercase tracking-widest mb-3 text-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.35)' }}
                >
                  Frequently Paired With
                </h4>
                <div className="flex flex-col gap-2">
                  {recommendedServices.map(rec => (
                    <div
                      key={rec.id}
                      className="border rounded-full pl-4 pr-1 py-1 flex items-center justify-between"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      <div className="flex flex-col flex-1 min-w-0 pr-2">
                        <span className="text-sm text-white/70 truncate" style={{ fontFamily: "'Bodoni Moda', serif" }}>{rec.name}</span>
                        <span className="text-[10px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: `${accent}90` }}>
                          ₹{rec.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        data-testid={`button-add-rec-${rec.id}`}
                        onClick={() => addToSession(rec)}
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                        style={{ background: accent, color: '#0B0B0F' }}
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
                className="w-full border text-white text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderColor: 'rgba(255,255,255,0.18)' }}
              >
                Add More Services
              </button>
              <button
                data-testid="button-review-session"
                onClick={handleReview}
                className="w-full font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: accent, color: '#0B0B0F', boxShadow: accentGlow }}
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
  const { accent, accentGlow } = useAccentColor();

  const handleWhatsApp = () => {
    const total = totalPrice();
    const serviceList = sessionItems.map(i => `• ${i.service.name} — ₹${i.service.price.toLocaleString('en-IN')}`).join('\n');
    const msg = `Hello Studio11,\n\nI would like to book the following services:\n\n${serviceList}\n\nTotal: ₹${total.toLocaleString('en-IN')}\nPreferred Date: \nPreferred Time: \n\nPlease confirm availability.`;
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[min(380px,90vw)] bg-[#0D0D11] border-l border-white/10 z-[80] flex flex-col shadow-2xl"
            style={{ borderLeftColor: `${accent}15` }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <h2 className="text-2xl text-white tracking-widest uppercase" style={{ fontFamily: "'Bodoni Moda', serif" }}>My Session</h2>
              <button data-testid="button-close-session" onClick={() => setSessionDrawerOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 flex flex-col gap-4">
              {sessionItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/25 gap-4">
                  <span className="italic text-xl" style={{ fontFamily: "'Bodoni Moda', serif" }}>Your session is empty</span>
                  <p className="text-xs text-center leading-relaxed max-w-[200px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Browse the menu and add services to build your perfect session.
                  </p>
                </div>
              ) : (
                sessionItems.map(item => (
                  <div
                    key={item.service.id}
                    data-testid={`session-item-${item.service.id}`}
                    className="flex items-start justify-between border-b pb-4"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex flex-col pr-4">
                      <span className="text-base text-white leading-snug mb-1" style={{ fontFamily: "'Bodoni Moda', serif" }}>{item.service.name}</span>
                      <span className="text-sm font-medium tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: accent }}>
                        {item.service.price === 0 ? 'Consult Us' : `₹${item.service.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <button
                      data-testid={`button-remove-${item.service.id}`}
                      onClick={() => removeFromSession(item.service.id)}
                      className="text-white/20 hover:text-red-400 transition-colors shrink-0 mt-1"
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
                    <span className="text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                      Total Duration
                    </span>
                    <span className="text-white text-lg" style={{ fontFamily: "'Bodoni Moda', serif" }}>{totalDuration()} Min</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                      Total Price
                    </span>
                    <span className="text-3xl leading-none" style={{ fontFamily: "'Bodoni Moda', serif", color: accent }}>
                      ₹{totalPrice().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  data-testid="button-book-appointment"
                  onClick={handleWhatsApp}
                  className="w-full font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: accent, color: '#0B0B0F', boxShadow: accentGlow }}
                >
                  Book Appointment
                </button>
                <button
                  data-testid="button-whatsapp"
                  onClick={handleWhatsApp}
                  className="w-full font-semibold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", border: `1px solid ${accent}50`, color: accent }}
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

function CategoryStoryIntro() {
  const { activeCategory } = useSessionStore();
  const { accent } = useAccentColor();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 1400);
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
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-5xl md:text-7xl text-white uppercase tracking-[0.3em] mb-4 text-center"
            style={{ fontFamily: "'Bodoni Moda', serif", marginLeft: '0.3em' }}
          >
            {activeCategory}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.2em] text-center px-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: `${accent}80` }}
          >
            {categoryTaglines[activeCategory]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
