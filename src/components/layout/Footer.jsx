import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Zap, ChevronLeft } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = 'https://wa.me/201020571846';

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="REV_ORA" className="h-14 w-auto mb-4" style={{ mixBlendMode: 'screen' }} />
            <p className="text-white/50 text-sm leading-relaxed">
              متخصصون في قطع غيار السيارات الأوروبية عالية الجودة لسيارات Volkswagen وSEAT وSkoda وAudi.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400/80 text-xs">متاح الآن</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { to: '/shop', label: 'المتجر' },
                { to: '/brands', label: 'الماركات' },
                { to: '/categories', label: 'التصنيفات' },
                { to: '/favorites', label: 'المفضلة' },
                { to: '/about', label: 'من نحن' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group">
                    <ChevronLeft size={14} className="text-red-500/50 group-hover:text-red-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">الماركات</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Volkswagen', models: 'Golf · Jetta · Passat · Tiguan' },
                { name: 'SEAT', models: 'Leon · Ibiza · FR' },
                { name: 'Skoda', models: 'Rapid · Fabia · Octavia · VRS · Kodiaq' },
                { name: 'Audi', models: 'A4 · A5 · A7 · A8 · Q7' },
              ].map(b => (
                <div key={b.name} className="bg-white/5 rounded-lg p-3">
                  <p className="text-white font-semibold text-sm">{b.name}</p>
                  <p className="text-white/30 text-xs mt-1">{b.models}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">تواصل معنا</h4>
            <div className="space-y-4">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-colors group">
                <div className="w-9 h-9 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20">
                  <MessageCircle size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">واتساب</p>
                  <p className="text-sm font-medium">+20 10 2057 1846</p>
                </div>
              </a>
              <a href="tel:+201020571846"
                className="flex items-center gap-3 text-white/70 hover:text-blue-400 transition-colors group">
                <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">هاتف</p>
                  <p className="text-sm font-medium">+20 10 2057 1846</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <MapPin size={16} className="text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">الموقع</p>
                  <p className="text-sm">مصر</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Zap size={12} className="text-red-500" />
            <span>© {year} REV_ORA. جميع الحقوق محفوظة.</span>
          </div>
          <p className="text-white/20 text-xs">VW · SEAT · SKODA · AUDI Premium Parts</p>
        </div>
      </div>
    </footer>
  );
}
