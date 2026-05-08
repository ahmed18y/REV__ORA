import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';

const BRANDS_DATA = [
  {
    id: 'VW',
    name: 'Volkswagen',
    arabicName: 'فولكسفاغن',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwsNWv6L23ucyMfnIXx8M33L1EXqoMsN7RA&s',
    models: [
      { name: 'Golf', arabic: 'جولف' },
      { name: 'Jetta', arabic: 'جيتا' },
      { name: 'Passat', arabic: 'بسات' },
      { name: 'Tiguan', arabic: 'تيجوان' },
    ],
    desc: 'فولكسفاغن — السيارة الشعبية بجودة ألمانية استثنائية. نوفر قطع غيار أصلية وعالية الجودة لجميع موديلات فولكسفاغن.',
    color: '#001e6e',
    bg: 'from-blue-950 to-blue-900',
  },
  {
    id: 'SEAT',
    name: 'SEAT',
    arabicName: 'سيات',
    logo: 'https://autohaus-habinghorst.de/wp-content/uploads/2021/06/SEAT_Logo_shadow.png',
    models: [
      { name: 'Leon', arabic: 'ليون' },
      { name: 'Ibiza', arabic: 'ابيزا' },
      { name: 'FR', arabic: 'FR' },
    ],
    desc: 'سيات — الروح الإسبانية والأداء الرياضي. قطع غيار عالية الجودة لجميع موديلات سيات.',
    color: '#cc0000',
    bg: 'from-red-950 to-red-900',
  },
  {
    id: 'SKODA',
    name: 'Škoda',
    arabicName: 'سكودا',
    logo: 'https://fabrikbrands.com/wp-content/uploads/Skoda-Logo-History-13-864x540.png',
    models: [
      { name: 'Rapid', arabic: 'رابيد' },
      { name: 'Fabia', arabic: 'فابيا' },
      { name: 'Octavia', arabic: 'اوكتافيا' },
      { name: 'VRS', arabic: 'VRS' },
      { name: 'Kodiaq', arabic: 'كودياك' },
    ],
    desc: 'سكودا — موثوقية تشيكية بتقنية ألمانية. نوفر قطع غيار أصلية لجميع موديلات سكودا.',
    color: '#4caf50',
    bg: 'from-green-950 to-green-900',
  },
  {
    id: 'AUDI',
    name: 'Audi',
    arabicName: 'أودي',
    logo: 'https://fabrikbrands.com/wp-content/uploads/Audi-Logo-1-scaled-1155x770.jpg',
    models: [
      { name: 'A4', arabic: 'A4' },
      { name: 'A5', arabic: 'A5' },
      { name: 'A7', arabic: 'A7' },
      { name: 'A8', arabic: 'A8' },
      { name: 'Q7', arabic: 'Q7' },
    ],
    desc: 'أودي — الفخامة الألمانية في كل تفصيلة. قطع غيار فاخرة لجميع موديلات أودي.',
    color: '#1a1a1a',
    bg: 'from-gray-950 to-gray-900',
  },
];

export default function Brands() {
  const { getByBrand } = useProducts();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-red-500 text-sm tracking-[0.3em] uppercase font-medium mb-3">شركاؤنا</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark-900 mb-4">الماركات</h1>
          <p className="text-dark-400 max-w-lg mx-auto">نتخصص في أفضل الماركات الأوروبية بقطع غيار أصلية وعالية الجودة</p>
        </motion.div>

        <div className="space-y-8">
          {BRANDS_DATA.map((brand, i) => {
            const count = getByBrand(brand.id).length;
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl bg-gradient-to-br ${brand.bg} overflow-hidden shadow-2xl`}
              >
                <div className="flex flex-col md:flex-row gap-8 p-8 md:p-10">
                  {/* Logo area */}
                  <div className="flex-shrink-0 flex items-center justify-center w-full md:w-48 h-36 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <img src={brand.logo} alt={brand.name} className="max-h-24 max-w-full object-contain"
                      onError={e => e.target.style.display='none'} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-3xl font-extrabold text-white">{brand.name}</h2>
                      <p className="text-white/50 text-sm">{brand.arabicName} · {count} قطعة متوفرة</p>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{brand.desc}</p>

                    {/* Models */}
                    <div className="flex flex-wrap gap-2">
                      {brand.models.map(m => (
                        <Link key={m.name} to={`/shop?brand=${brand.id}&q=${m.name}`}
                          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
                          {m.arabic} ({m.name})
                        </Link>
                      ))}
                    </div>

                    <Link to={`/shop?brand=${brand.id}`}
                      className="inline-flex items-center gap-2 bg-white text-dark-900 font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm">
                      عرض جميع قطع {brand.name}
                      <ArrowLeft size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
