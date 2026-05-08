import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_LOGOS = [
  { name: 'VW', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwsNWv6L23ucyMfnIXx8M33L1EXqoMsN7RA&s' },
  { name: 'SEAT', src: 'https://autohaus-habinghorst.de/wp-content/uploads/2021/06/SEAT_Logo_shadow.png' },
  { name: 'SKODA', src: 'https://fabrikbrands.com/wp-content/uploads/Skoda-Logo-History-13-864x540.png' },
  { name: 'AUDI', src: 'https://fabrikbrands.com/wp-content/uploads/Audi-Logo-1-scaled-1155x770.jpg' },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=logos, 1=loading, 2=done

  useEffect(() => {
    // Phase 0: show logos
    const t1 = setTimeout(() => setPhase(1), 800);

    // Phase 1: animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    // Phase 2: complete
    const t2 = setTimeout(() => { setPhase(2); setTimeout(onComplete, 600); }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(interval); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #1a0a0a 50%, #0a0814 100%)' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500/30"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ y: [-20, 20], opacity: [0.2, 0.8, 0.2], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(rgba(255,50,50,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,50,50,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* REV_ORA Logo */}
          <motion.div
            className="relative z-10 mb-10"
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <div className="relative">
              <img src="/logo.png" alt="REV_ORA" className="h-28 md:h-36 w-auto drop-shadow-2xl" style={{ mixBlendMode: 'screen' }} />
              {/* Red glow under logo */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-red-600/40 blur-xl rounded-full" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-white/60 text-sm tracking-[0.3em] uppercase mb-10 font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Premium Auto Parts
          </motion.p>

          {/* Brand Logos */}
          <motion.div
            className="flex items-center gap-6 md:gap-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, staggerChildren: 0.1 }}
          >
            {BRAND_LOGOS.map((brand, i) => (
              <motion.div
                key={brand.name}
                className="relative group"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm hover:bg-white/20 transition-all">
                  <img src={brand.src} alt={brand.name} className="w-10 h-10 object-contain" onError={e => e.target.style.display='none'} />
                </div>
                <p className="text-center text-white/50 text-xs mt-1 tracking-wider">{brand.name}</p>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-red-500/40"
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-64 md:w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-white/30 text-xs tracking-widest">LOADING</p>
              <p className="text-red-400/60 text-xs">{Math.min(Math.round(progress), 100)}%</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
