import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';

const CATEGORY_ICONS = {
  'فلاتر زيت': '🛢️', 'فلاتر هواء': '💨', 'فلاتر بنزين': '⛽', 'فلاتر تكييف': '❄️',
  'فرامل': '🛑', 'مساعدين': '🔧', 'كاتينة': '⚙️', 'تبريد': '🌡️',
  'تغذية وقود': '⛽', 'حساسات': '📡', 'إشعال': '⚡', 'ناقل الحركة': '🔄',
  'فتيس': '🔧', 'كهرباء': '🔌', 'تكييف': '❄️', 'داخلي': '🪑',
  'تعليق': '🔩', 'محرك': '🔧', 'خراطيم': '🔵', 'سيور': '➰',
  'خارجي': '🚗', 'إضاءة': '💡', 'إكسسوارات': '✨', 'فلاتر فتيس': '🔄',
};

export default function Categories() {
  const { categories, products } = useProducts();

  const catData = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
    icon: CATEGORY_ICONS[cat] || '🔧',
    brands: [...new Set(products.filter(p => p.category === cat).map(p => p.brand))].filter(b => b !== 'عام'),
  })).sort((a, b) => b.count - a.count);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-red-500 text-sm tracking-[0.3em] uppercase font-medium mb-3">التصنيفات</p>
          <h1 className="text-4xl font-extrabold text-dark-900 mb-3">تصفح حسب التصنيف</h1>
          <p className="text-dark-400">اختر تصنيف القطعة التي تبحث عنها</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {catData.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="block bg-white rounded-2xl p-5 hover:shadow-xl border border-dark-100 hover:border-primary-300 transition-all duration-300 group hover:-translate-y-1">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-dark-800 text-sm leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-dark-400 text-xs">{cat.count} منتج</p>
                {cat.brands.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cat.brands.slice(0, 3).map(b => (
                      <span key={b} className="bg-dark-50 text-dark-400 text-xs px-1.5 py-0.5 rounded">{b}</span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
