import { Link } from 'react-router';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { properties } from '../data/properties';
import { useLang } from '../context/LanguageContext';

type ViewMode = 'swipe' | 'grid';

// ─── Mobile swipe card ───────────────────────────────────────────────────────
function SwipeCard({
  property,
  onNext,
  onPrev,
  direction,
}: {
  property: (typeof properties)[0];
  onNext: () => void;
  onPrev: () => void;
  direction: 'left' | 'right' | null;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-10, 10]);
  const overlayOpacity = useTransform(x, [-150, 0, 150], [0.5, 0, 0.5]);
  const overlayColorL = useTransform(x, [-100, 0], [1, 0]);
  const overlayColorR = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -80 || info.velocity.x < -400) {
      onNext();
    } else if (info.offset.x > 80 || info.velocity.x > 400) {
      onPrev();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, cursor: 'grab' }}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute inset-0 touch-none select-none"
    >
      {/* Drag direction overlays */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        style={{ opacity: overlayOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(184,151,90,0.3), transparent)',
            opacity: overlayColorL,
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(184,151,90,0.3), transparent)',
            opacity: overlayColorR,
          }}
        />
      </motion.div>

      {/* Card image */}
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020]/90 via-[#0C1020]/20 to-transparent" />

      {/* Tag */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
          {property.tag}
        </span>
      </div>

      {/* Country */}
      <div className="absolute top-6 right-6 z-10">
        <span className="text-[0.6rem] tracking-[0.1em] text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1.5">
          {property.country === 'Morocco' ? '🇲🇦 Morocco' : '🇪🇸 Spain'}
        </span>
      </div>

      {/* Swipe hint */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="text-white/15 text-[0.6rem] tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>
          ←
        </div>
        <div className="text-white/15 text-[0.6rem] tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          →
        </div>
      </div>

      {/* Property info - glassmorphism panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div
          className="mx-4 mb-4 p-5"
          style={{
            background: 'rgba(12, 16, 32, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p className="text-[0.6rem] tracking-[0.14em] uppercase text-white/50 mb-1">
            {property.location} · {property.area}
          </p>
          <h3
            className="text-white font-light leading-[1.2] mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)' }}
          >
            {property.name}
          </h3>

          <div className="flex items-center gap-4 mb-3">
            <span className="flex items-center gap-1.5 text-[0.65rem] text-white/55">
              <svg className="w-3 h-3 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              {property.beds} Beds
            </span>
            <span className="flex items-center gap-1.5 text-[0.65rem] text-white/55">
              <svg className="w-3 h-3 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10H3M7 10V6a5 5 0 0 1 10 0v4" /><rect x="3" y="10" width="18" height="11" rx="1" />
              </svg>
              {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5 text-[0.65rem] text-white/55">
              <svg className="w-3 h-3 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
              {property.sqm} m²
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className="font-light text-[#B8975A]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 5vw, 1.8rem)' }}
            >
              €{property.price.toLocaleString()}
            </span>
            <Link
              to={`/property/${property.id}`}
              className="text-[0.6rem] tracking-[0.12em] uppercase text-[#B8975A] border-b border-[#B8975A] pb-[1px]"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Floating action buttons */}
        <div className="flex items-center justify-center gap-3 pb-4 px-4">
          <a
            href="/#contact"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[0.6rem] tracking-[0.12em] uppercase text-white bg-[#B8975A] font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Enquire
          </a>
          <button
            className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Grid Card ───────────────────────────────────────────────────────────────
function GridCard({ property, index }: { property: (typeof properties)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/property/${property.id}`} className="block overflow-hidden bg-[var(--color-surface)]">
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span className="absolute top-4 left-4 text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
            {property.tag}
          </span>
          <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.1em] text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1">
            {property.country === 'Morocco' ? '🇲🇦 Morocco' : '🇪🇸 Spain'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          <p className="text-[0.62rem] tracking-[0.12em] uppercase text-[var(--color-text-faint)] mb-3">
            {property.location} · {property.area}
          </p>
          <h3
            className="font-light leading-[1.2] mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}
          >
            {property.name}
          </h3>
          <div className="flex gap-4 mb-5 pb-5 border-b border-[var(--color-divider)]">
            <span className="flex items-center gap-1.5 text-[0.7rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              {property.beds}
            </span>
            <span className="flex items-center gap-1.5 text-[0.7rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10H3M7 10V6a5 5 0 0 1 10 0v4" /><rect x="3" y="10" width="18" height="11" rx="1" />
              </svg>
              {property.baths}
            </span>
            <span className="flex items-center gap-1.5 text-[0.7rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
              {property.sqm} m²
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[#B8975A]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}
            >
              €{property.price.toLocaleString()}
            </span>
            <span className="text-[0.62rem] tracking-[0.1em] uppercase text-[#B8975A] border-b border-[#B8975A] pb-[1px]">
              Details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PropertyListingPage() {
  const { t } = useLang();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [filter, setFilter] = useState<'all' | 'Spain' | 'Morocco'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredProperties = properties.filter((p) => {
    const countryMatch = filter === 'all' || p.country === filter;
    const typeMatch = typeFilter === 'all' || p.type === typeFilter;
    return countryMatch && typeMatch;
  });

  const handleNext = () => {
    setSwipeDirection('left');
    setCurrentIdx((i) => (i + 1) % filteredProperties.length);
    setTimeout(() => setSwipeDirection(null), 400);
  };

  const handlePrev = () => {
    setSwipeDirection('right');
    setCurrentIdx((i) => (i - 1 + filteredProperties.length) % filteredProperties.length);
    setTimeout(() => setSwipeDirection(null), 400);
  };

  const currentProperty = filteredProperties[currentIdx] ?? filteredProperties[0];

  return (
    <main className="min-h-screen bg-[var(--color-bg)]" style={{ paddingTop: '72px' }}>
      {/* ─── Page Header ─────────────────────────────────────── */}
      <section className="bg-[#0C1020] py-14 md:py-20 relative overflow-hidden">
        {/* Background image subtle */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1656379231057-0e55a36183d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0C1020]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[0.65rem] tracking-[0.25em] uppercase text-[#B8975A] mb-4"
          >
            {t.listing.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-white font-light leading-[1.0]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,5rem)' }}
          >
            {t.listing.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/45 mt-5 max-w-[48ch] text-sm leading-[1.8]"
          >
            {t.listing.sub}
          </motion.p>
        </div>
      </section>

      {/* ─── Filters & View Toggle ───────────────────────────── */}
      <div className="sticky top-[72px] z-50 bg-[var(--color-surface)] border-b border-[var(--color-divider)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Location filter */}
          <div className="flex items-center gap-1">
            {(['all', 'Spain', 'Morocco'] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setCurrentIdx(0); }}
                className={`px-3 py-1.5 text-[0.6rem] tracking-[0.1em] uppercase transition-all ${
                  filter === f
                    ? 'bg-[#B8975A] text-[#0C1020]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {f === 'all' ? t.listing.allLocations : f}
              </button>
            ))}
          </div>

          {/* View mode (desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)] mr-2">
              {filteredProperties.length} {t.listing.propertiesCount}
            </span>
            <div className="flex items-center border border-[var(--color-border)] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`p-2 transition-all ${
                  viewMode === 'grid' ? 'bg-[#B8975A] text-[#0C1020]' : 'text-[var(--color-text-muted)]'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('swipe')}
                title="Showcase view"
                className={`p-2 transition-all ${
                  viewMode === 'swipe' ? 'bg-[#B8975A] text-[#0C1020]' : 'text-[var(--color-text-muted)]'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="18" rx="1" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile: Full-Screen Swipe Cards ─────────────────── */}
      <div className="md:hidden">
        {filteredProperties.length > 0 ? (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between px-6 py-3 bg-[var(--color-surface-2)]">
              <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)]">
                {currentIdx + 1} of {filteredProperties.length}
              </span>
              <div className="flex gap-1">
                {filteredProperties.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] transition-all duration-300 ${
                      i === currentIdx ? 'w-6 bg-[#B8975A]' : 'w-3 bg-[var(--color-border)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card */}
            <div
              className="relative overflow-hidden"
              style={{ height: 'calc(100svh - 72px - 64px - 44px)' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentProperty.id}
                  initial={{
                    opacity: 0,
                    x: swipeDirection === 'left' ? 120 : swipeDirection === 'right' ? -120 : 0,
                    scale: 0.95,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: swipeDirection === 'left' ? -120 : 120,
                    scale: 0.95,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SwipeCard
                    property={currentProperty}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    direction={swipeDirection}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-3 p-4 bg-[var(--color-surface)] border-t border-[var(--color-divider)]">
              <button
                onClick={handlePrev}
                className="flex-1 py-3 border border-[var(--color-border)] text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:border-[#B8975A] hover:text-[#B8975A] transition-all flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {t.listing.allLocations === 'All Locations' ? 'Prev' : t.properties.prev}
              </button>
              <Link
                to={`/property/${currentProperty.id}`}
                className="flex-1 py-3 bg-[#0C1020] text-white text-[0.65rem] tracking-[0.1em] uppercase text-center"
              >
                {t.listing.viewDetails}
              </Link>
              <button
                onClick={handleNext}
                className="flex-1 py-3 border border-[var(--color-border)] text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:border-[#B8975A] hover:text-[#B8975A] transition-all flex items-center justify-center gap-2"
              >
                {t.listing.allLocations === 'All Locations' ? 'Next' : t.properties.next}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center px-6">
            <p className="text-[var(--color-text-faint)] text-sm">{t.listing.noResults}</p>
            <button onClick={() => setFilter('all')} className="mt-4 text-[#B8975A] text-xs tracking-[0.1em] uppercase border-b border-[#B8975A]">
              {t.listing.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* ─── Desktop: Gallery / Grid ──────────────────────────── */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {viewMode === 'swipe' ? (
            /* Desktop Showcase View */
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-16"
            >
              <div className="max-w-[1400px] mx-auto px-10">
                {filteredProperties.length > 0 && (
                  <>
                    <div style={{ perspective: '2200px' }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentProperty.id}
                          initial={{ opacity: 0, rotateY: 15, scale: 0.92 }}
                          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                          exit={{ opacity: 0, rotateY: -15, scale: 0.92 }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="grid grid-cols-[1.3fr_1fr] bg-[var(--color-surface)] shadow-[0_32px_80px_rgba(12,16,32,0.15)] overflow-hidden">
                            {/* Image */}
                            <div className="relative h-[580px] overflow-hidden group">
                              <motion.img
                                src={currentProperty.image}
                                alt={currentProperty.name}
                                className="w-full h-full object-cover"
                                key={currentProperty.id}
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.9 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <span className="absolute top-8 left-8 text-[0.62rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-4 py-2">
                                {currentProperty.tag}
                              </span>
                              <button
                                onClick={handlePrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/8 backdrop-blur border border-white/15 text-white hover:bg-[#B8975A] hover:border-[#B8975A] hover:text-[#0C1020] transition-all flex items-center justify-center"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="15 18 9 12 15 6" />
                                </svg>
                              </button>
                              <button
                                onClick={handleNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/8 backdrop-blur border border-white/15 text-white hover:bg-[#B8975A] hover:border-[#B8975A] hover:text-[#0C1020] transition-all flex items-center justify-center"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              </button>
                            </div>

                            {/* Info */}
                            <div className="p-10 xl:p-14 flex flex-col justify-center">
                              <p className="text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-5">
                                {currentProperty.location} · {currentProperty.area}
                              </p>
                              <h2
                                className="font-light leading-[1.1] mb-5"
                                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.5vw, 2.6rem)' }}
                              >
                                {currentProperty.name}
                              </h2>
                              <p className="text-sm text-[var(--color-text-muted)] leading-[1.85] mb-8">
                                {currentProperty.description}
                              </p>

                              <div className="grid grid-cols-3 gap-6 py-6 border-y border-[var(--color-divider)] mb-8">
                                {[
                                  { value: currentProperty.beds, label: t.detail.bedrooms },
                                  { value: currentProperty.baths, label: t.detail.bathrooms },
                                  { value: `${currentProperty.sqm}m²`, label: t.detail.builtArea },
                                ].map((spec) => (
                                  <div key={spec.label}>
                                    <div
                                      className="text-[1.7rem] font-light leading-none mb-1 text-[var(--color-text)]"
                                      style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                      {spec.value}
                                    </div>
                                    <div className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)]">
                                      {spec.label}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mb-8">
                                <p className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)] mb-2">
                                  {t.listing.askingPrice}
                                </p>
                                <p
                                  className="font-light text-[#B8975A]"
                                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
                                >
                                  €{currentProperty.price.toLocaleString()}
                                </p>
                              </div>

                              <div className="flex flex-col gap-3">
                                <Link
                                  to={`/property/${currentProperty.id}`}
                                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#B8975A] text-[#0C1020] text-[0.7rem] font-medium tracking-[0.12em] uppercase hover:bg-[#9B7D42] transition-colors"
                                >
                                  {t.listing.viewFull}
                                </Link>
                                <a
                                  href="/#contact"
                                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[var(--color-border)] text-[var(--color-text)] text-[0.7rem] font-medium tracking-[0.12em] uppercase hover:border-[#B8975A] hover:text-[#B8975A] transition-colors"
                                >
                                  {t.listing.enquireNow}
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex items-center justify-center gap-4 mt-10 overflow-x-auto pb-2">
                      {filteredProperties.map((prop, i) => (
                        <button
                          key={prop.id}
                          onClick={() => setCurrentIdx(i)}
                          className={`relative flex-shrink-0 w-24 h-24 overflow-hidden transition-all duration-300 ${
                            i === currentIdx
                              ? 'ring-2 ring-[#B8975A] ring-offset-2 ring-offset-[var(--color-bg)] scale-105'
                              : 'opacity-50 hover:opacity-80'
                          }`}
                        >
                          <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            /* Desktop Grid View */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-16"
            >
              <div className="max-w-[1400px] mx-auto px-10">
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.map((property, i) => (
                      <GridCard key={property.id} property={property} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <p className="text-[var(--color-text-faint)]">{t.listing.noResults}</p>
                    <button onClick={() => setFilter('all')} className="mt-4 text-[#B8975A] text-xs tracking-[0.1em] uppercase border-b border-[#B8975A]">
                      {t.listing.clearFilters}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom spacer (mobile bottom nav) ───────────────── */}
      <div className="h-4 md:h-0" />
    </main>
  );
}