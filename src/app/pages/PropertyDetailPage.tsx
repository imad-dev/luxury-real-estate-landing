import { useParams, Link, Navigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { properties } from '../data/properties';
import { useLang } from '../context/LanguageContext';

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { t } = useLang();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return <Navigate to="/404" replace />;
  }

  const relatedProperties = properties.filter((p) => p.id !== property.id);

  const prevImage = () => {
    setActiveImage((i) => (i - 1 + property.images.length) % property.images.length);
  };
  const nextImage = () => {
    setActiveImage((i) => (i + 1) % property.images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) nextImage();
      else prevImage();
    }
    setTouchStart(null);
  };

  return (
    <main className="bg-[var(--color-bg)]" style={{ paddingTop: '72px' }}>
      {/* ═══════════════════════════════════════════════════════
          BACK + BREADCRUMB
      ═══════════════════════════════════════════════════════ */}
      <div className="border-b border-[var(--color-divider)] bg-[var(--color-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center gap-3 text-[0.62rem] tracking-[0.08em]">
          <Link to="/properties" className="text-[var(--color-text-faint)] hover:text-[#B8975A] transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t.detail.back}
          </Link>
          <span className="text-[var(--color-text-faint)]">/</span>
          <span className="text-[var(--color-text-muted)] truncate max-w-[28ch]">{property.name}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO GALLERY — Full bleed
      ═══════════════════════════════════════════════════════ */}
      <div
        ref={galleryRef}
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(300px, 55vw, 680px)' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={property.images[activeImage]}
            alt={`${property.name} — ${activeImage + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020]/50 via-transparent to-[#0C1020]/20" />

        {/* Tag */}
        <div className="absolute top-6 left-6 z-10">
          <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
            {property.tag}
          </span>
        </div>

        {/* Country */}
        <div className="absolute top-6 right-20 z-10">
          <span className="text-[0.6rem] text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 tracking-[0.1em]">
            {property.country === 'Morocco' ? '🇲🇦 Morocco' : '🇪🇸 Spain'}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-6 right-6 z-10 w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-sm border border-white/15 text-white transition-colors"
          aria-label="Save property"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={saved ? '#B8975A' : 'none'}
            stroke={saved ? '#B8975A' : 'currentColor'}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Prev/Next arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/8 backdrop-blur border border-white/15 text-white hover:bg-[#B8975A] hover:border-[#B8975A] hover:text-[#0C1020] transition-all flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/8 backdrop-blur border border-white/15 text-white hover:bg-[#B8975A] hover:border-[#B8975A] hover:text-[#0C1020] transition-all flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {property.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`transition-all duration-300 ${
                i === activeImage
                  ? 'w-6 h-[2px] bg-[#B8975A]'
                  : 'w-3 h-[2px] bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-divider)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex gap-2 overflow-x-auto">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 overflow-hidden transition-all ${
                i === activeImage
                  ? 'ring-2 ring-[#B8975A] ring-offset-1'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16 pb-[120px] md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-16 items-start">

          {/* LEFT: Main info */}
          <div>
            {/* Location + name */}
            <Reveal>
              <p className="text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-3">
                {property.location} · {property.area} · {property.country}
              </p>
              <h1
                className="font-light leading-[1.0] mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                }}
              >
                {property.name}
              </h1>

              {/* Mobile price */}
              <div className="flex items-baseline gap-4 mb-8 lg:hidden">
                <span
                  className="font-light text-[#B8975A]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}
                >
                  €{property.price.toLocaleString()}
                </span>
                <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)]">
                  {property.status === 'for-sale' ? t.detail.forSale : property.status}
                </span>
              </div>
            </Reveal>

            {/* Specs strip */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-0 border border-[var(--color-divider)] mb-10">
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9,22 9,12 15,12 15,22" />
                      </svg>
                    ),
                    value: property.beds,
                    label: t.detail.bedrooms,
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M21 10H3M7 10V6a5 5 0 0 1 10 0v4" />
                        <rect x="3" y="10" width="18" height="11" rx="1" />
                      </svg>
                    ),
                    value: property.baths,
                    label: t.detail.bathrooms,
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    ),
                    value: `${property.sqm}m²`,
                    label: t.detail.builtArea,
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <rect x="3" y="11" width="18" height="11" rx="1" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ),
                    value: property.garage ?? '—',
                    label: t.detail.garage,
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    ),
                    value: property.yearBuilt ?? '—',
                    label: t.detail.yearBuilt,
                  },
                ].map((spec, i) => (
                  <div
                    key={spec.label}
                    className="flex flex-col items-center justify-center py-5 px-3 border-l border-[var(--color-divider)] first:border-l-0 text-center"
                  >
                    <div className="text-[#B8975A] mb-2">{spec.icon}</div>
                    <div
                      className="font-light leading-none mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}
                    >
                      {spec.value}
                    </div>
                    <div className="text-[0.55rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)]">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.15}>
              <div className="mb-10">
                <h2
                  className="font-light mb-5"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {t.detail.about}
                </h2>
                <p className="text-[var(--color-text-muted)] leading-[1.9] text-sm">
                  {property.description}
                </p>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={0.2}>
              <div className="mb-10">
                <h2
                  className="font-light mb-6"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {t.detail.features}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="flex items-start gap-3 py-3 border-b border-[var(--color-divider)] last:border-b-0"
                    >
                      <div className="w-4 h-4 border border-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm text-[var(--color-text-muted)] leading-[1.6]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Location info */}
            <Reveal delay={0.25}>
              <div className="p-6 bg-[var(--color-surface-2)] border border-[var(--color-divider)]">
                <h3 className="text-[0.62rem] tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-4">
                  {t.detail.location}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-4 h-4 text-[#B8975A] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span
                    className="font-light"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
                  >
                    {property.location}, {property.area}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-faint)] pl-7">
                  {property.country === 'Morocco'
                    ? t.detail.moroccoDesc
                    : t.detail.marbellaDesc}
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Sticky sidebar (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[96px] space-y-4">
              {/* Price card */}
              <Reveal>
                <div className="bg-[#0C1020] p-8">
                  <p className="text-[0.6rem] tracking-[0.15em] uppercase text-white/35 mb-3">
                    {t.detail.askingPrice}
                  </p>
                  <p
                    className="font-light text-[#B8975A] leading-none mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
                  >
                    €{property.price.toLocaleString()}
                  </p>
                  <p className="text-[0.62rem] tracking-[0.1em] uppercase text-white/25 mb-8">
                    {property.status === 'for-sale' ? t.detail.forSale : property.status}
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full py-3.5 bg-[#B8975A] text-[#0C1020] text-[0.7rem] font-medium tracking-[0.12em] uppercase hover:bg-[#9B7D42] transition-colors"
                    >
                      {t.detail.requestViewing}
                    </button>
                    <a
                      href="mailto:riffinityrealestate@gmail.com"
                      className="w-full py-3.5 border border-white/15 text-white text-[0.7rem] tracking-[0.12em] uppercase hover:border-[#B8975A] hover:text-[#B8975A] transition-colors flex items-center justify-center"
                    >
                      {t.detail.contactAgent}
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center gap-3 text-[0.7rem] text-white/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t.detail.trilingual}
                    </div>
                    <div className="flex items-center gap-3 text-[0.7rem] text-white/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t.detail.discretion}
                    </div>
                    <div className="flex items-center gap-3 text-[0.7rem] text-white/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t.detail.privateViewing}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Agent card */}
              <Reveal delay={0.1}>
                <div className="p-6 border border-[var(--color-divider)] bg-[var(--color-surface)]">
                  <p className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-4">
                    {t.detail.yourAgent}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#B8975A]/20 border border-[#B8975A]/30 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                        Riffinity Team
                      </div>
                      <div className="text-[0.62rem] text-[var(--color-text-faint)]">{t.detail.agentTitle}</div>
                    </div>
                  </div>
                  <a
                    href="mailto:riffinityrealestate@gmail.com"
                    className="flex items-center gap-2 text-[0.7rem] text-[#B8975A] hover:opacity-70 transition-opacity"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    riffinityrealestate@gmail.com
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SIMILAR PROPERTIES
      ═══════════════════════════════════════════════════════ */}
      {relatedProperties.length > 0 && (
        <section className="py-16 md:py-20 bg-[var(--color-surface-2)] border-t border-[var(--color-divider)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <Reveal>
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#B8975A] mb-3">
                {t.detail.youMayAlsoLike}
              </p>
              <div className="w-8 h-[1px] bg-[#B8975A] mb-6" />
              <h2
                className="font-light mb-10"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
              >
                {t.detail.similarProperties}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.slice(0, 3).map((prop, i) => (
                <motion.article
                  key={prop.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/property/${prop.id}`} className="block overflow-hidden bg-[var(--color-surface)]">
                    <div className="relative overflow-hidden">
                      <img
                        src={prop.image}
                        alt={prop.name}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute top-4 left-4 text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
                        {prop.tag}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-text-faint)] mb-2">
                        {prop.location} · {prop.area}
                      </p>
                      <h3
                        className="font-light leading-[1.2] mb-4"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
                      >
                        {prop.name}
                      </h3>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-divider)]">
                        <span
                          className="font-light text-[#B8975A]"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}
                        >
                          €{prop.price.toLocaleString()}
                        </span>
                        <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[#B8975A] border-b border-[#B8975A] pb-[1px]">
                          View
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          MOBILE: Sticky bottom bar (above bottom nav)
      ═══════════════════════════════════════════════════════ */}
      <div
        className="fixed left-0 right-0 z-[80] lg:hidden"
        style={{
          bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(12, 16, 32, 0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-[0.55rem] tracking-[0.1em] uppercase text-white/35 truncate">
              {property.location}
            </p>
            <p
              className="font-light text-[#B8975A] leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}
            >
              €{property.price.toLocaleString()}
            </p>
          </div>
          <a
            href="/#contact"
            className="flex-shrink-0 px-5 py-3 bg-[#B8975A] text-[#0C1020] text-[0.65rem] font-medium tracking-[0.12em] uppercase hover:bg-[#9B7D42] transition-colors"
          >
            {t.detail.enquire}
          </a>
          <button
            onClick={() => setSaved(!saved)}
            className="flex-shrink-0 w-10 h-10 border border-white/15 flex items-center justify-center"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={saved ? '#B8975A' : 'none'}
              stroke={saved ? '#B8975A' : 'rgba(255,255,255,0.5)'}
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ENQUIRY MODAL (Desktop)
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {enquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6"
            style={{ background: 'rgba(12, 16, 32, 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setEnquiryOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--color-surface)] w-full max-w-lg p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEnquiryOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <p className="text-[0.62rem] tracking-[0.15em] uppercase text-[#B8975A] mb-2">{t.detail.requestViewingModal}</p>
              <h2 className="font-light mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
                {property.name}
              </h2>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEnquiryOpen(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.contact.firstName}
                    className="bg-[var(--color-surface-2)] border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[#B8975A]"
                  />
                  <input
                    type="text"
                    placeholder={t.contact.lastName}
                    className="bg-[var(--color-surface-2)] border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[#B8975A]"
                  />
                </div>
                <input
                  type="email"
                  placeholder={t.contact.emailLabel}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[#B8975A]"
                />
                <textarea
                  rows={3}
                  placeholder={t.detail.messagePlaceholder}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[#B8975A] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B8975A] text-[#0C1020] text-[0.7rem] font-medium tracking-[0.12em] uppercase hover:bg-[#9B7D42] transition-colors"
                >
                  {t.detail.sendRequest}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}