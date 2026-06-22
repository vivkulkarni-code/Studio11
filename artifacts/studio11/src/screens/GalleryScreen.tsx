import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useSessionStore } from '@/store/sessionStore';
import { GALLERY_PHOTOS, GalleryPhoto } from '@/data/galleryPhotos';
import logoPath from '@assets/logo_transparent.png';

const CATEGORIES = ['All', ...Array.from(new Set(GALLERY_PHOTOS.map(p => p.category)))];

export default function GalleryScreen() {
  const setAppScreen = useSessionStore(s => s.setAppScreen);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  const currentPhoto: GalleryPhoto | null = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="w-full h-[100dvh] bg-[#0B0B0F] flex flex-col overflow-hidden">

      {/* Header */}
      <div
        className="flex-none h-[58px] flex items-center justify-between px-4 border-b border-white/10"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(20px)' }}
      >
        <button
          onClick={() => setAppScreen('main')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Back
          </span>
        </button>

        <div className="flex items-center gap-2">
          <img src={logoPath} alt="Studio11" className="h-6 w-auto object-contain" />
          <span
            className="text-white tracking-[0.32em] uppercase text-[13px] font-semibold"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Our Work
          </span>
        </div>

        <div className="w-16" />
      </div>

      {/* Category filter pills */}
      {CATEGORIES.length > 1 && (
        <div className="flex-none px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-white/5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-none px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] transition-all"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                color: activeCategory === cat ? '#0B0B0F' : 'rgba(255,255,255,0.55)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontWeight: activeCategory === cat ? 700 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Photo grid */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 pb-10">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <Images size={32} style={{ color: 'rgba(212,175,55,0.5)' }} />
            </div>
            <p
              className="text-[13px] text-center"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.35)' }}
            >
              Photos coming soon
            </p>
            <p
              className="text-[11px] text-center max-w-[200px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.2)' }}
            >
              Upload your work photos to showcase them here
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-2 space-y-0">
            {filtered.map((photo, idx) => (
              <motion.div
                key={photo.id}
                className="break-inside-avoid mb-2 rounded-xl overflow-hidden cursor-pointer relative group"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption ?? photo.category}
                  className="w-full object-cover block"
                  style={{ minHeight: '120px' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.35)' }}
                />
                {photo.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-2 py-2 opacity-0 group-active:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
                  >
                    <p
                      className="text-white text-[10px] uppercase tracking-[0.12em]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.93)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              onClick={closeLightbox}
            >
              <X size={18} style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                className="absolute left-3 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={e => { e.stopPropagation(); prevPhoto(); }}
              >
                <ChevronLeft size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={currentPhoto.id}
              className="max-w-[92vw] max-h-[80vh] flex flex-col items-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption ?? currentPhoto.category}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
              />
              {(currentPhoto.caption || currentPhoto.category) && (
                <div className="mt-3 text-center">
                  {currentPhoto.caption && (
                    <p
                      className="text-white text-[13px] tracking-[0.1em]"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {currentPhoto.caption}
                    </p>
                  )}
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mt-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#D4AF3799' }}
                  >
                    {currentPhoto.category}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Next */}
            {filtered.length > 1 && (
              <button
                className="absolute right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={e => { e.stopPropagation(); nextPhoto(); }}
              >
                <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </button>
            )}

            {/* Counter */}
            {filtered.length > 1 && lightboxIndex !== null && (
              <div
                className="absolute bottom-6 left-0 right-0 flex justify-center"
              >
                <span
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
