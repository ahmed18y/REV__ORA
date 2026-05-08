import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../ui/ProductCard';

const TABS = [
  { id: 'all', label: 'الكل' },
  { id: 'AUDI', label: 'Audi' },
  { id: 'VW', label: 'Volkswagen' },
  { id: 'SKODA', label: 'Skoda' },
  { id: 'SEAT', label: 'SEAT' },
];

export default function FeaturedProducts() {
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? products.filter(p => p.imageUrl).slice(0, 8)
    : products.filter(p => p.brand === activeTab && p.imageUrl).slice(0, 8);

  return (
    <section className="py-20 bg-dark-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-red-500 text-sm tracking-[0.3em] uppercase font-medium mb-2">منتجاتنا</p>
            <h2 className="text-4xl font-extrabold text-dark-900">
              قطع <span className="text-primary-600">مميزة</span>
            </h2>
          </motion.div>
          <Link to="/shop"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold transition-colors group">
            عرض الكل
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {TABS.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-red-200'
                  : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="h-48 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-4 shimmer rounded w-1/2" />
                  <div className="h-8 shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-dark-400">
            <p className="text-lg">لا توجد منتجات في هذه الفئة</p>
          </div>
        )}
      </div>
    </section>
  );
}
