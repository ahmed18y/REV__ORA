import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/shop', label: 'المتجر' },
  { to: '/brands', label: 'الماركات' },
  { to: '/categories', label: 'التصنيفات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, favorites, setCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 shadow-2xl' : 'py-4'}`}
        style={{
          /* Always dark so logo (mix-blend:screen) shows perfectly */
          background: scrolled
            ? 'rgba(12,12,20,0.97)'
            : 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between gap-3">

          {/* Logo — mix-blend-mode:screen removes black background */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="REV_ORA"
              className="h-11 w-auto object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>

          {/* Mobile Search — always visible */}
          <form onSubmit={handleSearch} className="flex-1 lg:hidden relative">
            <input
              type="text"
              dir="rtl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن قطعة..."
              className="w-full text-sm rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/10 border border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
              <Search size={15} />
            </button>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to}
                className={`relative font-semibold text-sm transition-colors duration-200 group ${
                  location.pathname === link.to ? 'text-red-400' : 'text-white/80 hover:text-red-400'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 right-0 h-0.5 bg-red-500 transition-all duration-300 ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex relative">
            <input
              type="text"
              dir="rtl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث..."
              className="w-36 focus:w-52 text-sm rounded-xl px-4 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 bg-white/10 border border-white/20 text-white placeholder:text-white/40"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
              <Search size={15} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/favorites" className="relative text-white/80 hover:text-red-400 transition-colors">
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button onClick={() => setCartOpen(true)} className="relative text-white/80 hover:text-red-400 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -left-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button className="lg:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 pt-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(8,8,16,0.98)', backdropFilter: 'blur(20px)' }}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.to}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}>
                  <Link to={link.to}
                    className={`text-2xl font-bold transition-colors ${
                      location.pathname === link.to ? 'text-red-500' : 'text-white hover:text-red-400'
                    }`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-3 text-red-400/70 text-sm mt-4">
                <Zap size={14} />
                <span>قطع غيار VW · SEAT · SKODA · AUDI</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
