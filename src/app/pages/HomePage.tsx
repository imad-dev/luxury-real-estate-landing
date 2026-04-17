import { Link } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { properties } from '../data/properties';
import { useLang } from '../context/LanguageContext';

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating label input ─────────────────────────────────────────────────────
function FloatingInput({ label, type = 'text', id }: { label: string; type?: string; id: string }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative">
      <input
        id={id} type={type}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="w-full bg-transparent border-b border-[var(--color-border)] pt-6 pb-2 text-sm text-[var(--color-text)] focus:outline-none transition-colors peer"
        style={{ borderColor: focused ? '#B8975A' : undefined }}
      />
      <label htmlFor={id} className="absolute left-0 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? '0' : '1.4rem',
          fontSize: focused || hasValue ? '0.6rem' : '0.85rem',
          color: focused ? '#B8975A' : 'var(--color-text-faint)',
          letterSpacing: focused || hasValue ? '0.14em' : '0',
          textTransform: focused || hasValue ? 'uppercase' : 'none',
        }}>
        {label}
      </label>
      <div className="absolute bottom-0 left-0 h-[1px] bg-[#B8975A] transition-all duration-300"
        style={{ width: focused ? '100%' : '0%' }} />
    </div>
  );
}

function FloatingTextarea({ label, id }: { label: string; id: string }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative">
      <textarea id={id} rows={4}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="w-full bg-transparent border-b border-[var(--color-border)] pt-6 pb-2 text-sm text-[var(--color-text)] focus:outline-none resize-none"
        style={{ borderColor: focused ? '#B8975A' : undefined }}
      />
      <label htmlFor={id} className="absolute left-0 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? '0' : '1.4rem',
          fontSize: focused || hasValue ? '0.6rem' : '0.85rem',
          color: focused ? '#B8975A' : 'var(--color-text-faint)',
          letterSpacing: focused || hasValue ? '0.14em' : '0',
          textTransform: focused || hasValue ? 'uppercase' : 'none',
        }}>
        {label}
      </label>
      <div className="absolute bottom-0 left-0 h-[1px] bg-[#B8975A] transition-all duration-300"
        style={{ width: focused ? '100%' : '0%' }} />
    </div>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────
function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/property/${property.id}`} className="block overflow-hidden bg-[var(--color-surface)]">
        <div className="relative overflow-hidden">
          <img src={property.image} alt={property.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
          <span className="absolute top-4 left-4 text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
            {property.tag}
          </span>
          <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.12em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1">
            {property.country === 'Morocco' ? '🇲🇦 Morocco' : '🇪🇸 Spain'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[var(--color-text-faint)] mb-3">
            {property.location} · {property.area}
          </p>
          <h3 className="text-[var(--text-lg)] font-light mb-4 leading-[1.2]"
            style={{ fontFamily: 'var(--font-display)' }}>
            {property.name}
          </h3>
          <div className="flex gap-5 mb-5 pb-5 border-b border-[var(--color-divider)]">
            <span className="flex items-center gap-1.5 text-[0.72rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              {property.beds} {t.properties.beds}
            </span>
            <span className="flex items-center gap-1.5 text-[0.72rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10H3M7 10V6a5 5 0 0 1 10 0v4" /><rect x="3" y="10" width="18" height="11" rx="1" />
              </svg>
              {property.baths} {t.properties.baths}
            </span>
            <span className="flex items-center gap-1.5 text-[0.72rem] text-[var(--color-text-muted)]">
              <svg className="w-3.5 h-3.5 text-[#B8975A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
              {property.sqm} m²
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-xl)] text-[#B8975A]" style={{ fontFamily: 'var(--font-display)' }}>
              €{property.price.toLocaleString()}
            </span>
            <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#B8975A] border-b border-[#B8975A] pb-[1px]">
              {t.properties.details}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Services accordion item ──────────────────────────────────────────────────
function ServiceItem({ item, index, learnMore }: {
  item: { num: string; title: string; body: string };
  index: number;
  learnMore: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.1}>
      <div className="border-b border-[var(--color-divider)] first:border-t">
        <button onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 md:py-8 text-left group">
          <div className="flex items-center gap-6">
            <span className="text-[2rem] md:text-[3rem] font-light text-[#B8975A] opacity-30 leading-none select-none"
              style={{ fontFamily: 'var(--font-display)' }}>
              {item.num}
            </span>
            <h3 className="text-[var(--text-lg)] font-light group-hover:text-[#B8975A] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </h3>
          </div>
          <div className={`w-8 h-8 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${open ? 'border-[#B8975A] rotate-45' : 'group-hover:border-[#B8975A]'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#B8975A' : 'currentColor'} strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pl-[calc(2rem+1.5rem)] md:pl-[calc(3rem+1.5rem)] pb-8">
                <p className="text-[var(--color-text-muted)] leading-[1.8] max-w-[55ch] text-sm">{item.body}</p>
                <a href="/#contact"
                  className="inline-flex items-center gap-2 mt-5 text-[0.65rem] tracking-[0.15em] uppercase text-[#B8975A] hover:opacity-70 transition-opacity">
                  {learnMore}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [activePropertyIdx, setActivePropertyIdx] = useState(0);
  const [formState, setFormState] = useState<'idle' | 'sent'>('idle');
  const [interest, setInterest] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePropertyIdx((i) => (i + 1) % properties.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Reset form when language changes
  useEffect(() => {
    setInterest('');
  }, [t]);

  return (
    <main>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] flex flex-col justify-end overflow-hidden">
        <motion.div className="absolute inset-0 scale-[1.15]" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1656379231057-0e55a36183d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Luxury villa Mediterranean"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1020]/30 via-[#0C1020]/10 to-[#0C1020]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1020]/40 to-transparent" />

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-10 px-6 md:px-10 pb-12 md:pb-20 max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[0.65rem] tracking-[0.3em] uppercase text-[#B8975A] mb-5">
            {t.hero.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-light leading-[0.9] text-white mb-8"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8.5vw, 8.5rem)', maxWidth: '14ch' }}>
            {t.hero.headline1}<br />{t.hero.headline2}{' '}
            <em className="italic" style={{ color: '#B8975A' }}>{t.hero.headlineItalic}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/60 text-sm leading-[1.8] mb-10 max-w-[40ch]">
            {t.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3">
            <Link to="/properties"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] hover:bg-[#9B7D42] transition-colors">
              {t.hero.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.15em] uppercase bg-transparent text-white border border-white/30 hover:border-[#B8975A] hover:text-[#B8975A] transition-colors">
              {t.hero.cta2}
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 right-8 md:right-12 z-10 flex-col items-center gap-2 hidden md:flex">
          <span className="text-[0.55rem] tracking-[0.2em] uppercase text-white/30 rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent to-[#B8975A]/60 animate-[scrollPulse_2.5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="bg-[#0C1020] border-b border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {t.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="py-8 md:py-10 px-6 border-l border-white/[0.06] first:border-l-0 text-center">
                  <div className="font-light text-[#B8975A] leading-none mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
                    {stat.number}
                  </div>
                  <div className="text-[0.6rem] tracking-[0.15em] uppercase text-white/35 mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="py-[clamp(4rem,10vw,9rem)]" id="about">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[clamp(3rem,8vw,7rem)] items-start">
            <Reveal>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1585942246090-2a212dce0501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                  alt="Luxury villa interior"
                  className="w-full aspect-[3/4] object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 bg-[#0C1020] p-6 md:p-8 hidden md:block">
                  <div className="text-[2.5rem] font-light text-[#B8975A] leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {t.about.badge1}
                  </div>
                  <div className="text-[0.6rem] tracking-[0.15em] uppercase text-white/40 mt-1 whitespace-pre-line">
                    {t.about.badge2}
                  </div>
                </motion.div>
              </div>
            </Reveal>

            <div className="pt-2 lg:pt-12">
              <Reveal>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#B8975A]">{t.about.eyebrow}</p>
                <div className="w-8 h-[1px] bg-[#B8975A] my-5" />
                <h2 className="font-light leading-[1.08] whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3.25rem)' }}>
                  {t.about.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <blockquote className="my-8 pl-5 border-l-[1.5px] border-[#B8975A] italic font-light leading-[1.4] whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'var(--color-text)' }}>
                  {t.about.quote}
                </blockquote>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[var(--color-text-muted)] leading-[1.85] text-sm mb-5">{t.about.p1}</p>
                <p className="text-[var(--color-text-muted)] leading-[1.85] text-sm mb-8">{t.about.p2}</p>
                <a href="/#services"
                  className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#B8975A] border-b border-[#B8975A] pb-[1px] hover:opacity-70 transition-opacity">
                  {t.about.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section className="py-[clamp(4rem,10vw,9rem)] bg-[var(--color-surface-2)]" id="services">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-14">
            <Reveal>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#B8975A]">{t.services.eyebrow}</p>
              <div className="w-8 h-[1px] bg-[#B8975A] my-5" />
              <h2 className="font-light whitespace-pre-line"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3.25rem)' }}>
                {t.services.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[var(--color-text-muted)] max-w-[38ch] leading-[1.85] text-sm">{t.services.sub}</p>
            </Reveal>
          </div>
          <div>
            {t.services.items.map((item, i) => (
              <ServiceItem key={item.num} item={item} index={i} learnMore={t.services.learnMore} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROPERTIES
      ══════════════════════════════════════════ */}
      <section className="py-[clamp(4rem,10vw,9rem)]" id="properties">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-8">
            <Reveal>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#B8975A]">{t.properties.eyebrow}</p>
              <div className="w-8 h-[1px] bg-[#B8975A] my-5" />
              <h2 className="font-light" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3.25rem)' }}>
                {t.properties.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/properties"
                className="inline-flex items-center gap-3 px-6 py-3 text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[var(--color-text)] border border-[var(--color-border)] hover:border-[#B8975A] hover:text-[#B8975A] transition-colors">
                {t.properties.viewAll}
              </Link>
            </Reveal>
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={activePropertyIdx}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={`/property/${properties[activePropertyIdx].id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img src={properties[activePropertyIdx].image} alt={properties[activePropertyIdx].name}
                        className="w-full aspect-[4/3] object-cover" />
                      <span className="absolute top-4 left-4 text-[0.6rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] px-3 py-1.5">
                        {properties[activePropertyIdx].tag}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5"
                        style={{ background: 'linear-gradient(to top, rgba(12,16,32,0.85) 0%, transparent 100%)' }}>
                        <p className="text-[0.6rem] tracking-[0.12em] uppercase text-white/60 mb-1">
                          {properties[activePropertyIdx].location}
                        </p>
                        <h3 className="font-light text-white text-base leading-[1.2]"
                          style={{ fontFamily: 'var(--font-display)' }}>
                          {properties[activePropertyIdx].name}
                        </h3>
                        <p className="font-light text-[#B8975A] mt-2"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                          €{properties[activePropertyIdx].price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-5">
                {properties.map((_, idx) => (
                  <button key={idx} onClick={() => setActivePropertyIdx(idx)}
                    className={`h-[2px] transition-all duration-300 ${activePropertyIdx === idx ? 'w-8 bg-[#B8975A]' : 'w-4 bg-[var(--color-border)]'}`} />
                ))}
              </div>
              <div className="flex items-center justify-between mt-5">
                <button onClick={() => setActivePropertyIdx((i) => (i - 1 + properties.length) % properties.length)}
                  className="flex items-center gap-2 text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:text-[#B8975A] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  {t.properties.prev}
                </button>
                <span className="text-[0.65rem] text-[var(--color-text-faint)]">
                  {activePropertyIdx + 1} / {properties.length}
                </span>
                <button onClick={() => setActivePropertyIdx((i) => (i + 1) % properties.length)}
                  className="flex items-center gap-2 text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:text-[#B8975A] transition-colors">
                  {t.properties.next}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EDITORIAL BANNER
      ══════════════════════════════════════════ */}
      <section className="relative py-[clamp(5rem,12vw,10rem)] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1656379231057-0e55a36183d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="" className="w-full h-full object-cover scale-[1.05]" />
          <div className="absolute inset-0 bg-[#0C1020]/80" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#B8975A] mb-6">{t.banner.eyebrow}</p>
            <h2 className="font-light text-white leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,5.5rem)', maxWidth: '16ch', margin: '0 auto 2rem' }}>
              {t.banner.heading}<br />
              <em className="italic" style={{ color: '#B8975A' }}>{t.banner.headingItalic}</em>
            </h2>
            <Link to="/properties"
              className="inline-flex items-center gap-3 px-8 py-4 text-[0.7rem] font-medium tracking-[0.15em] uppercase border border-white/30 text-white hover:border-[#B8975A] hover:text-[#B8975A] transition-colors">
              {t.banner.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section className="py-[clamp(4rem,10vw,9rem)]" id="contact">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,8vw,7rem)] items-start">
            {/* Left */}
            <div>
              <Reveal>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#B8975A]">{t.contact.eyebrow}</p>
                <div className="w-8 h-[1px] bg-[#B8975A] my-5" />
                <h2 className="font-light leading-[1.05]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3.25rem)' }}>
                  {t.contact.heading1}<br />
                  <em className="italic" style={{ fontFamily: 'var(--font-display)' }}>{t.contact.headingItalic}</em>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-muted)] mt-6 max-w-[40ch] leading-[1.85] text-sm">{t.contact.sub}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 space-y-7">
                  {[
                    {
                      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                      label: t.contact.email, value: 'riffinityrealestate@gmail.com', href: 'mailto:riffinityrealestate@gmail.com',
                    },
                    {
                      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
                      label: t.contact.instagram, value: '@riffinityrealestate', href: 'https://www.instagram.com/riffinityrealestate/',
                    },
                    {
                      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                      label: t.contact.offices, value: t.contact.officesValue,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center text-[#B8975A] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-1">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-[#B8975A] hover:opacity-70 transition-opacity">{item.value}</a>
                        ) : (
                          <span className="text-sm text-[var(--color-text-muted)]">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <Reveal delay={0.2}>
              {formState === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 border border-[var(--color-border)]">
                  <div className="w-12 h-12 border border-[#B8975A] flex items-center justify-center mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="1.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-light text-xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{t.contact.successSub}</p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormState('sent'); }} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <FloatingInput label={t.contact.firstName} id="firstName" />
                    <FloatingInput label={t.contact.lastName} id="lastName" />
                  </div>
                  <FloatingInput label={t.contact.emailLabel} id="email" type="email" />
                  <FloatingInput label={t.contact.phone} id="phone" type="tel" />

                  <div className="relative">
                    <select value={interest} onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-transparent border-b border-[var(--color-border)] pt-5 pb-2 text-sm text-[var(--color-text)] focus:outline-none appearance-none"
                      style={{ borderColor: interest ? '#B8975A' : undefined }}>
                      <option value="">{t.contact.interest}</option>
                      {t.contact.interests.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <label className="absolute left-0 top-0 text-[0.6rem] tracking-[0.14em] uppercase text-[#B8975A]">
                      {t.contact.interest}
                    </label>
                    <div className="absolute right-0 bottom-2.5 pointer-events-none text-[var(--color-text-faint)]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <FloatingTextarea label={t.contact.message} id="message" />

                  <button type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 py-4 text-[0.7rem] font-medium tracking-[0.15em] uppercase bg-[#B8975A] text-[#0C1020] hover:bg-[#9B7D42] transition-colors md:w-auto md:px-10">
                    {t.contact.send}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <p className="text-[0.6rem] text-[var(--color-text-faint)] tracking-[0.05em]">{t.contact.privacy}</p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
