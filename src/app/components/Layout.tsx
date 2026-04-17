import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang, type Lang } from '../context/LanguageContext';

const RiffinityLogo = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" fill="none" width={size} height={size} aria-hidden="true">
    <path d="M4 28L4 4L20 4C24.418 4 28 7.582 28 12C28 15.4 25.966 18.332 23 19.656L28 28L22 28L17.5 20L10 20L10 28Z" stroke="#B8975A" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 4L10 16L20 16C22.209 16 24 14.209 24 12C24 9.791 22.209 8 20 8L10 8" stroke="#B8975A" strokeWidth="1.5" />
    <line x1="4" y1="28" x2="28" y2="28" stroke="#B8975A" strokeWidth="0.75" opacity="0.4" />
  </svg>
);

export function Layout() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.properties, href: '/properties', isLink: true },
    { label: t.nav.services, href: '/#services' },
    { label: t.nav.contact, href: '/#contact' },
  ];

  const menuItems = [
    { label: t.nav.home, href: '/', isLink: true },
    { label: t.nav.properties, href: '/properties', isLink: true },
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.services, href: '/#services' },
    { label: t.nav.contact, href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleMenuNav = (href: string, isLink?: boolean) => {
    setMenuOpen(false);
    if (isLink) {
      navigate(href);
    } else {
      const [, hash] = href.split('#');
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    const path = href.split('#')[0];
    return path !== '/' && location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ─── Top Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0C1020] shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-[#0C1020]/90 backdrop-blur-xl'
        }`}
      >
        {/* Thin gold accent line at top */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B8975A]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[68px] lg:h-[76px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <RiffinityLogo size={24} />
              <span
                className="text-white tracking-[0.12em] uppercase text-[0.95rem] lg:text-[1.05rem] transition-colors duration-300 group-hover:text-[#B8975A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Riffinity
              </span>
            </Link>

            {/* ── Desktop nav links (lg+) ── */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-10 list-none m-0 p-0">
              {navLinks.map((link) =>
                link.isLink ? (
                  <li key={link.href} style={{ maxWidth: 'none' }}>
                    <Link
                      to={link.href}
                      className={`text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 ${
                        isActiveRoute(link.href)
                          ? 'text-[#B8975A]'
                          : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href} style={{ maxWidth: 'none' }}>
                    <a
                      href={link.href}
                      className="text-[0.65rem] tracking-[0.2em] uppercase text-white/55 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>

            {/* ── Desktop right actions (lg+) ── */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              {/* Language switcher */}
              <div className="flex items-center gap-0.5">
                {(['EN', 'FR', 'ES'] as Lang[]).map((l, i) => (
                  <span key={l} className="flex items-center">
                    {i > 0 && <span className="w-px h-3 bg-white/15 mx-1" />}
                    <button
                      onClick={() => setLang(l)}
                      className={`text-[0.6rem] font-medium tracking-[0.14em] uppercase px-1.5 py-1 transition-all duration-200 ${
                        lang === l
                          ? 'text-[#B8975A]'
                          : 'text-white/30 hover:text-white/65'
                      }`}
                    >
                      {l}
                    </button>
                  </span>
                ))}
              </div>
              <div className="w-px h-5 bg-white/10" />
              <a
                href="/#contact"
                className="text-[0.62rem] font-medium tracking-[0.18em] uppercase text-[#0C1020] bg-[#B8975A] px-5 py-2.5 hover:bg-[#9B7D42] transition-colors whitespace-nowrap"
              >
                {t.nav.enquire}
              </a>
            </div>

            {/* ── Mobile / Tablet right: lang + hamburger (< lg) ── */}
            <div className="flex lg:hidden items-center gap-4">
              {/* Compact language switcher */}
              <div className="flex items-center gap-0.5">
                {(['EN', 'FR', 'ES'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[0.58rem] font-medium tracking-[0.1em] uppercase px-1.5 py-1 transition-all duration-200 ${
                      lang === l ? 'text-[#B8975A]' : 'text-white/30 hover:text-white/65'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="flex flex-col justify-center gap-[6px] w-10 h-10 -mr-2"
                aria-label="Open menu"
              >
                <span className="block w-6 h-[1.5px] bg-white/80 rounded-full transition-all duration-300" />
                <span className="block w-6 h-[1.5px] bg-white/80 rounded-full transition-all duration-300" />
                <span className="block w-4 h-[1.5px] bg-[#B8975A] rounded-full transition-all duration-300" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ─── Fullscreen Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] flex flex-col overflow-hidden"
            style={{ background: '#080C18' }}
          >
            {/* Gold accent line on left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#B8975A]/50 to-transparent" />

            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-5 pb-3 border-b border-white/[0.04]">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                <RiffinityLogo size={22} />
                <span
                  className="text-white tracking-[0.12em] uppercase text-[0.95rem]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Riffinity
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center px-6 md:px-10">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleMenuNav(item.href, item.isLink)}
                    className="group w-full text-left py-4 border-b border-white/[0.05] last:border-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="font-light text-white/80 group-hover:text-[#B8975A] transition-colors duration-300 leading-none"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2rem, 7vw, 3.2rem)',
                        }}
                      >
                        {item.label}
                      </span>
                      <svg
                        className="w-4 h-4 text-white/15 group-hover:text-[#B8975A] flex-shrink-0 -rotate-45 transition-colors duration-300"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Menu Footer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="px-6 md:px-10 pb-8 pt-4 border-t border-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                {/* Language switcher */}
                <div className="flex items-center gap-5">
                  {(['EN', 'FR', 'ES'] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`text-[0.62rem] tracking-[0.18em] uppercase transition-all duration-200 ${
                        lang === l ? 'text-[#B8975A]' : 'text-white/25 hover:text-white/65'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2.5">
                  <a
                    href="https://www.instagram.com/riffinityrealestate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/35 hover:border-[#B8975A] hover:text-[#B8975A] transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    href="mailto:riffinityrealestate@gmail.com"
                    className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/35 hover:border-[#B8975A] hover:text-[#B8975A] transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>
              <p className="text-[0.55rem] tracking-[0.18em] uppercase text-white/18 mt-4">
                {t.hero.location}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Page Content ─── */}
      <Outlet />

      {/* ─── Footer ─── */}
      <footer
        className="bg-[#0C1020] pt-16 border-t border-white/[0.04]"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <RiffinityLogo size={22} />
                <span className="font-display text-lg text-white tracking-[0.1em] uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  Riffinity
                </span>
              </div>
              <p className="text-[0.8rem] text-white/40 leading-[1.85] max-w-[28ch] mb-6">
                {t.footer.tagline}
              </p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/riffinityrealestate/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#B8975A] hover:text-[#B8975A] transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="mailto:riffinityrealestate@gmail.com"
                  className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#B8975A] hover:text-[#B8975A] transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Properties */}
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/35 mb-5">
                {t.footer.propertiesHeading}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                <li><Link to="/properties" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.allListings}</Link></li>
                <li><Link to="/properties" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.marbellaVillas}</Link></li>
                <li><Link to="/properties" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.moroccoRiads}</Link></li>
                <li><Link to="/properties" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.holidayRentals}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/35 mb-5">
                {t.footer.servicesHeading}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                <li><a href="/#services" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.sales}</a></li>
                <li><a href="/#services" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.acquisitions}</a></li>
                <li><a href="/#services" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.concierge}</a></li>
                <li><a href="/#contact" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors">{t.footer.consultation}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/35 mb-5">
                {t.footer.contactHeading}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                <li><a href="mailto:riffinityrealestate@gmail.com" className="text-[0.8rem] text-white/35 hover:text-[#B8975A] transition-colors break-all">riffinityrealestate@gmail.com</a></li>
                <li className="text-[0.8rem] text-white/35">Marbella, Spain</li>
                <li className="text-[0.8rem] text-white/35">Marrakech, Morocco</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.05] pt-8 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[0.65rem] tracking-[0.08em] text-white/20">{t.footer.rights}</p>
            <nav className="flex gap-6">
              <a href="#" className="text-[0.65rem] text-white/20 hover:text-[#B8975A] transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-[0.65rem] text-white/20 hover:text-[#B8975A] transition-colors">{t.footer.legal}</a>
              <a href="#" className="text-[0.65rem] text-white/20 hover:text-[#B8975A] transition-colors">{t.footer.cookie}</a>
            </nav>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[90] md:hidden border-t border-white/[0.06]"
        style={{
          background: 'rgba(12, 16, 32, 0.97)',
          backdropFilter: 'blur(20px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 px-4 transition-colors ${
              location.pathname === '/' ? 'text-[#B8975A]' : 'text-white/40'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            <span className="text-[0.55rem] tracking-[0.1em] uppercase">{t.nav.home}</span>
          </Link>

          <Link
            to="/properties"
            className={`flex flex-col items-center gap-1 px-4 transition-colors ${
              location.pathname.includes('/propert') ? 'text-[#B8975A]' : 'text-white/40'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            <span className="text-[0.55rem] tracking-[0.1em] uppercase">{t.nav.properties}</span>
          </Link>

          <a
            href="/#contact"
            className="flex flex-col items-center gap-1 px-4 text-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="text-[0.55rem] tracking-[0.1em] uppercase">{t.nav.enquire}</span>
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className={`flex flex-col items-center gap-1 px-4 transition-colors ${
              menuOpen ? 'text-[#B8975A]' : 'text-white/40'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="text-[0.55rem] tracking-[0.1em] uppercase">{t.nav.services}</span>
          </button>
        </div>
      </nav>
    </>
  );
}