import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { ArrowLeft } from 'lucide-react';

const BRANDS = [
  {
    id: 'VW',
    name: 'Volkswagen',
    arabicName: 'فولكسفاغن',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwsNWv6L23ucyMfnIXx8M33L1EXqoMsN7RA&s',
    models: ['Golf', 'Jetta', 'Passat', 'Tiguan'],
    color: '#001e6e',
    accent: '#4f8cff',
    description: 'سيارات شعبية بجودة ألمانية',
  },
  {
    id: 'SEAT',
    name: 'SEAT',
    arabicName: 'سيات',
    logo: 'https://autohaus-habinghorst.de/wp-content/uploads/2021/06/SEAT_Logo_shadow.png',
    models: ['Leon', 'Ibiza', 'FR'],
    color: '#cc0000',
    accent: '#ff4444',
    description: 'أداء رياضي بروح إسبانية',
  },
  {
    id: 'SKODA',
    name: 'Škoda',
    arabicName: 'سكودا',
    logo: 'https://fabrikbrands.com/wp-content/uploads/Skoda-Logo-History-13-864x540.png',
    models: ['Rapid', 'Fabia', 'Octavia', 'VRS', 'Kodiaq'],
    color: '#4caf50',
    accent: '#7ec87e',
    description: 'موثوقية ومتانة تشيكية',
  },
  {
    id: 'AUDI',
    name: 'Audi',
    arabicName: 'أودي',
    logo: 'https://fabrikbrands.com/wp-content/uploads/Audi-Logo-1-scaled-1155x770.jpg',
    models: ['A4', 'A5', 'A7', 'A8', 'Q7'],
    color: '#1a1a1a',
    accent: '#888888',
    description: 'فخامة ألمانية لا مثيل لها',
  },
];

export default function BrandsSection() {
  const { getByBrand } = useProducts();

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,50,50,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,50,50,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-red-400 text-sm tracking-[0.3em] uppercase font-medium mb-3">الماركات</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            ماركات <span className="text-red-500">أوروبية</span> متخصصة
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            نتخصص في قطع غيار أعلى الماركات الأوروبية بجودة أصلية وأسعار منافسة
          </p>
        </motion.div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand, i) => {
            const count = getByBrand(brand.id).length;
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Gradient hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${brand.color}22, ${brand.accent}11)` }} />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${brand.color}, ${brand.accent})` }} />

                <div className="p-6 relative z-10">
                  {/* Logo */}
                  <div className="w-20 h-16 mx-auto mb-5 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                      onError={e => e.target.style.display='none'}
                    />
                  </div>

                  <h3 className="text-white font-extrabold text-xl text-center mb-1">{brand.name}</h3>
                  <p className="text-white/40 text-sm text-center mb-3">{brand.arabicName}</p>
                  <p className="text-white/30 text-xs text-center mb-5">{brand.description}</p>

                  {/* Models */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                    {brand.models.map(m => (
                      <span key={m} className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">{m}</span>
                    ))}
                  </div>

                  {/* Count & Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">{count} قطعة متوفرة</span>
                    <Link to={`/shop?brand=${brand.id}`}
                      className="flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-red-400 text-white/50">
                      استعرض
                      <ArrowLeft size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
